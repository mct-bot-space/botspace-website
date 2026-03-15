import { useState, useRef, useEffect } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: number
  role: 'bot' | 'user'
  text: string
  image?: string
}

interface Slot {
  label: string
  datum: string
  uhrzeit: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GREETING_ID = 1
const GREETING_TEXT =
  '👋 Hallo! Ich bin der Bot Space Assistent.\n\n🤖 Ich beantworte deine Fragen zu KI-Chatbots, unseren Paketen und Preisen — direkt und ohne Wartezeit.\n\nWomit kann ich dir helfen?'

const QUICK_REPLIES = [
  'Was kostet ein Chatbot?',
  'Welche Pakete gibt es?',
  'Wie läuft die Umsetzung ab?',
  'Demo-Gespräch vereinbaren',
]

const WEBHOOK_URL = 'https://mctecommerce.app.n8n.cloud/webhook/bot-space-chatbot'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sanitize(raw: string): string {
  return raw.replace(/</g, '').replace(/>/g, '').trim().slice(0, 500)
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />')
}

function getOrCreateSessionId(): string {
  const key = 'botspace_session_id'
  const existing = localStorage.getItem(key)
  if (existing) return existing
  const id = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  localStorage.setItem(key, id)
  return id
}

function loadSavedMessages(): Message[] | null {
  try {
    const saved = localStorage.getItem('botspace_chat_history')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed as Message[]
    }
  } catch { /* ignore */ }
  return null
}

// ─── Chip Component ───────────────────────────────────────────────────────────

function Chip({ label, onClick, delay = 0 }: { label: string; onClick: () => void; delay?: number }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#1A73E8' : '#fff',
        border: '1.5px solid #1A73E8',
        borderRadius: 20,
        padding: '6px 14px',
        fontSize: 14,
        color: hov ? '#fff' : '#1A73E8',
        cursor: 'pointer',
        fontWeight: 500,
        transition: 'background 0.15s, color 0.15s, transform 0.15s',
        animation: 'chipFadeIn 0.3s ease both',
        animationDelay: `${delay}ms`,
        transform: hov ? 'scale(0.95)' : 'scale(1)',
      }}
    >
      {label}
    </button>
  )
}

// ─── ChatWidget ───────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [sessionId] = useState<string>(() => getOrCreateSessionId())
  const [open, setOpen] = useState(false)
  const [showTeaser, setShowTeaser] = useState(false)
  const [hasBeenOpened, setHasBeenOpened] = useState(false)

  // Open/close animation
  const [shouldRender, setShouldRender] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)

  const [messages, setMessages] = useState<Message[]>(() =>
    loadSavedMessages() ?? [{ id: GREETING_ID, role: 'bot', text: GREETING_TEXT }]
  )

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImg] = useState<string | null>(null)
  const [imageError, setImgErr] = useState<string | null>(null)

  const [greetingChipsUsed, setGreetingChipsUsed] = useState<boolean>(() =>
    loadSavedMessages()?.some(m => m.role === 'user') ?? false
  )

  const [activeAktion, setActiveAktion] = useState<string | null>(null)
  const [activeSlots, setActiveSlots] = useState<Slot[]>([])

  // Qualification state — refs to avoid stale closures in async calls
  const [modus, setModus] = useState<'chat' | 'qualifizierung'>('chat')
  const [, setGewaehlterSlot] = useState<{ datum: string; uhrzeit: string } | null>(null)
  const modusRef = useRef<'chat' | 'qualifizierung'>('chat')
  const slotRef = useRef<{ datum: string; uhrzeit: string } | null>(null)

  // Keep refs in sync with state
  const updateModus = (m: 'chat' | 'qualifizierung') => {
    setModus(m)
    modusRef.current = m
  }
  const updateSlot = (s: { datum: string; uhrzeit: string } | null) => {
    setGewaehlterSlot(s)
    slotRef.current = s
  }

  // Mobile detection
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 640
  )

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Effects ────────────────────────────────────────────────────────────────

  // Mobile resize
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  // Body overflow lock on mobile
  useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open, isMobile])

  // Open/close animation
  useEffect(() => {
    if (open) {
      setHasBeenOpened(true)
      setShouldRender(true)
      setShowTeaser(false)
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimateIn(true)))
      setTimeout(() => inputRef.current?.focus(), 350)
    } else {
      setAnimateIn(false)
      const timer = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timer)
    }
  }, [open])

  // Teaser
  useEffect(() => {
    const t1 = setTimeout(() => setShowTeaser(true), 3000)
    const t2 = setTimeout(() => setShowTeaser(false), 9000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Persist messages
  useEffect(() => {
    localStorage.setItem('botspace_chat_history', JSON.stringify(messages.slice(-50)))
  }, [messages])

  // ── Image ──────────────────────────────────────────────────────────────────

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImgErr(null)
    if (file.size > 5 * 1024 * 1024) {
      setImgErr('Bild zu groß (max. 5 MB).')
      e.target.value = ''
      return
    }
    const reader = new FileReader()
    reader.onload = () => setImg(reader.result as string)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  // ── Core webhook call (uses refs for always-current values) ────────────────

  const sendToWebhook = async (
    text: string,
    opts?: { img?: string | null },
  ) => {
    setLoading(true)
    setActiveAktion(null)
    setActiveSlots([])

    try {
      const body: Record<string, unknown> = {
        nachricht: text,
        session_id: sessionId,
        kunde: 'bot-space',
        modus: modusRef.current,
      }

      if (opts?.img) body.bild = opts.img

      // In qualification mode, always send selected slot data
      if (modusRef.current === 'qualifizierung' && slotRef.current) {
        body.extraktion = {
          datum: slotRef.current.datum,
          uhrzeit: slotRef.current.uhrzeit,
        }
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000)

      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      const data = await res.json()
      const reply: string = data?.antwort || ''
      const aktion: string = data?.aktion || 'none'
      const slots: Slot[] = Array.isArray(data?.slots) ? data.slots : []

      // Determine bot message
      let botText = reply
      if (!botText && (aktion === 'termin_gebucht' || aktion === 'termin_buchen')) {
        botText = '✅ Dein Termin wurde erfolgreich gebucht! Du erhältst eine Bestätigung per E-Mail.'
      }
      if (!botText) {
        botText = 'Ich konnte leider keine Antwort erhalten. Bitte versuche es nochmal.'
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: botText }])

      // Handle actions
      if (aktion === 'termin_gebucht' || aktion === 'termin_buchen') {
        localStorage.setItem('botspace_bookings_count', '1')
        updateModus('chat')
        updateSlot(null)
      } else if (aktion === 'slot_auswahl') {
        setActiveAktion('slot_auswahl')
      } else if (aktion === 'slots_anzeigen') {
        setActiveAktion('slots_anzeigen')
        setActiveSlots(slots)
      }
    } catch (err) {
      const isTimeout = err instanceof DOMException && err.name === 'AbortError'
      setMessages(prev => [...prev, {
        id: Date.now() + 1, role: 'bot',
        text: isTimeout
          ? 'Das dauert etwas länger als erwartet. Bitte warte kurz und versuche es nochmal.'
          : 'Verbindungsproblem. Bitte versuche es gleich nochmal.',
      }])
    } finally {
      setLoading(false)
    }
  }

  // ── Slot selection ─────────────────────────────────────────────────────────

  const handleSlotSelect = (slot: Slot) => {
    const bookings = parseInt(localStorage.getItem('botspace_bookings_count') || '0')
    if (bookings >= 1) {
      setMessages(prev => [...prev, {
        id: Date.now(), role: 'bot',
        text: 'Du hast bereits einen Demo-Termin gebucht. Bei Fragen wende dich an **info@bot-space.de**.',
      }])
      setActiveAktion(null)
      setActiveSlots([])
      return
    }

    // Save slot & switch to qualification mode (via refs for immediate availability)
    updateSlot({ datum: slot.datum, uhrzeit: slot.uhrzeit })
    updateModus('qualifizierung')
    setActiveAktion(null)
    setActiveSlots([])

    // Show user selection
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: slot.label }])

    // Send to webhook to start qualification (refs are already updated)
    sendToWebhook(
      `Ich habe den Slot ${slot.datum} um ${slot.uhrzeit} gewählt. Bitte starte die Qualifizierung.`,
    )
  }

  // ── Send message ───────────────────────────────────────────────────────────

  const sendMessage = async (overrideText?: string) => {
    const raw = overrideText ?? input
    const text = sanitize(raw)
    if (!text || loading) return

    // /reset command
    if (text === '/reset') {
      localStorage.removeItem('botspace_session_id')
      localStorage.removeItem('botspace_chat_history')
      localStorage.removeItem('botspace_bookings_count')
      window.location.reload()
      return
    }

    if (!greetingChipsUsed) setGreetingChipsUsed(true)

    const imgToSend = imagePreview

    setMessages(prev => [...prev, {
      id: Date.now(), role: 'user', text,
      ...(imgToSend ? { image: imgToSend } : {}),
    }])
    setInput('')
    setImg(null)
    setImgErr(null)

    await sendToWebhook(text, { img: imgToSend })
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage()
  }

  const canSend = !loading && (input.trim().length > 0 || imagePreview !== null)

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Chat window */}
      {shouldRender && (
        <div style={{
          position: 'fixed',
          ...(isMobile
            ? { inset: 0, width: '100%', height: '100%', maxHeight: '100dvh', borderRadius: 0 }
            : { bottom: 90, right: 24, width: 380, height: 520, borderRadius: 16 }),
          background: '#fff',
          boxShadow: isMobile ? 'none' : '0 8px 40px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column',
          zIndex: 10000, overflow: 'hidden', fontFamily: 'inherit',
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
        }}>

          {/* Header */}
          <div style={{
            background: '#1A73E8',
            padding: isMobile ? 'max(14px, env(safe-area-inset-top)) 18px 14px' : '14px 18px',
            flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', flexShrink: 0,
              }}>
                <img src="/Logo-Main-White.png" alt="Bot Space"
                  style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
                  Bot Space
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.85)', fontSize: 12,
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: '50%', background: '#4ade80',
                    display: 'inline-block', boxShadow: '0 0 4px rgba(74,222,128,0.6)',
                  }} />
                  Online
                </div>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} style={{
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8,
              width: 36, height: 36, cursor: 'pointer', color: '#fff', fontSize: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
            >✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px 14px',
            display: 'flex', flexDirection: 'column', gap: 10, background: '#f8faff',
            WebkitOverflowScrolling: 'touch',
          }}>
            {messages.map((msg, idx) => (
              <div key={msg.id} style={{
                animation: idx > 0 ? 'msgFadeIn 0.25s ease both' : undefined,
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}>
                  <div style={{
                    maxWidth: '78%',
                    padding: idx === 0 ? '12px 14px' : '10px 14px',
                    borderRadius: msg.role === 'user'
                      ? '18px 18px 4px 18px'
                      : '18px 18px 18px 4px',
                    background: msg.role === 'user' ? '#1A73E8' : '#fff',
                    color: msg.role === 'user' ? '#fff' : '#1a1a2e',
                    fontSize: 14, lineHeight: 1.55,
                    boxShadow: msg.role === 'bot' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                    wordBreak: 'break-word',
                    borderTop: idx === 0 ? '3px solid #1A73E8' : undefined,
                  }}>
                    {msg.image && (
                      <img src={msg.image} alt="Anhang" style={{
                        width: '100%', maxWidth: 200, borderRadius: 8,
                        marginBottom: 6, display: 'block',
                      }} />
                    )}
                    {msg.role === 'bot'
                      ? <span dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }} />
                      : msg.text}
                  </div>
                </div>

                {/* Greeting chips */}
                {msg.id === GREETING_ID && !greetingChipsUsed && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 8 }}>
                    {QUICK_REPLIES.map((q, i) => (
                      <Chip key={q} label={q} onClick={() => sendMessage(q)} delay={i * 60} />
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Loading dots */}
            {loading && (
              <div style={{
                display: 'flex', justifyContent: 'flex-start',
                animation: 'msgFadeIn 0.2s ease both',
              }}>
                <div style={{
                  padding: '12px 16px', borderRadius: '18px 18px 18px 4px',
                  background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  display: 'flex', gap: 5, alignItems: 'center',
                }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 8, height: 8, borderRadius: '50%', background: '#1A73E8',
                      display: 'inline-block', animation: 'botDot 1.2s infinite',
                      animationDelay: `${i * 0.2}s`, opacity: 0.4,
                    }} />
                  ))}
                </div>
              </div>
            )}

            {/* slot_auswahl: Montag / Sonntag */}
            {!loading && activeAktion === 'slot_auswahl' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 4 }}>
                {['Montag', 'Sonntag'].map((tag, i) => (
                  <Chip key={tag} label={tag} onClick={() => sendMessage(tag)} delay={i * 60} />
                ))}
              </div>
            )}

            {/* slots_anzeigen */}
            {!loading && activeAktion === 'slots_anzeigen' && activeSlots.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {activeSlots.map((slot, i) => (
                    <Chip
                      key={i}
                      label={slot.label || `${slot.datum} — ${slot.uhrzeit} Uhr`}
                      onClick={() => handleSlotSelect(slot)}
                      delay={i * 60}
                    />
                  ))}
                </div>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  style={{
                    fontSize: 12, color: '#6b7280', textDecoration: 'underline',
                    cursor: 'pointer', marginTop: 2,
                  }}
                >
                  Keiner der Termine passt? Kontaktformular öffnen
                </a>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div style={{
            padding: isMobile
              ? '10px 14px max(12px, env(safe-area-inset-bottom))'
              : '10px 14px 12px',
            borderTop: '1px solid #eef0f5',
            display: 'flex', flexDirection: 'column', gap: 8,
            background: '#fff', flexShrink: 0,
          }}>
            {imagePreview && (
              <div style={{ position: 'relative', width: 60 }}>
                <img src={imagePreview} alt="Vorschau" style={{
                  width: 60, height: 60, objectFit: 'cover', borderRadius: 8,
                  display: 'block', border: '1.5px solid #e0e7ef',
                }} />
                <button type="button" onClick={() => { setImg(null); setImgErr(null) }} style={{
                  position: 'absolute', top: -6, right: -6, width: 18, height: 18,
                  borderRadius: '50%', background: '#ef4444', border: 'none',
                  color: '#fff', fontSize: 11, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>✕</button>
              </div>
            )}
            {imageError && (
              <div style={{ fontSize: 12, color: '#ef4444' }}>{imageError}</div>
            )}

            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button type="button" onClick={() => fileInputRef.current?.click()}
                title="Bild anhängen"
                style={{
                  background: 'none', border: '1.5px solid #e0e7ef', borderRadius: 10,
                  width: 40, height: 40, cursor: 'pointer', flexShrink: 0, color: '#6b7280',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#1A73E8'
                  e.currentTarget.style.color = '#1A73E8'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#e0e7ef'
                  e.currentTarget.style.color = '#6b7280'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.41 17.41a2 2 0 01-2.83-2.83l8.49-8.48" />
                </svg>
              </button>
              <input ref={fileInputRef} type="file" accept="image/png,image/jpeg"
                style={{ display: 'none' }} onChange={handleFileChange} />

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={modus === 'qualifizierung' ? 'Deine Antwort…' : 'Nachricht schreiben…'}
                disabled={loading}
                maxLength={500}
                style={{
                  flex: 1, border: '1.5px solid #e0e7ef', borderRadius: 10,
                  padding: '10px 14px', fontSize: 16, outline: 'none',
                  background: loading ? '#f5f5f5' : '#fff',
                  color: '#1a1a2e', transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#1A73E8')}
                onBlur={e => (e.currentTarget.style.borderColor = '#e0e7ef')}
              />

              <button type="button" onClick={() => sendMessage()} disabled={!canSend}
                style={{
                  background: canSend ? '#1A73E8' : '#b0c8f5',
                  border: 'none', borderRadius: 10, width: 42, height: 42,
                  cursor: canSend ? 'pointer' : 'default', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button + pulse + teaser */}
      <div style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
        display: open && isMobile ? 'none' : 'flex',
        flexDirection: 'column', alignItems: 'flex-end', gap: 10,
      }}>
        {showTeaser && !open && (
          <div
            onClick={() => { setShowTeaser(false); setOpen(true) }}
            style={{
              background: '#fff', borderRadius: '16px 16px 4px 16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
              padding: '10px 14px', fontSize: 14, color: '#1a1a2e',
              maxWidth: 220, lineHeight: 1.4,
              animation: 'teaserIn 0.3s ease', cursor: 'pointer', userSelect: 'none',
            }}
          >
            👋 <strong>Hallo!</strong> Ich beantworte deine Fragen sofort.
          </div>
        )}

        <div style={{ position: 'relative', width: 58, height: 58 }}>
          {/* Strong pulse before first open */}
          {!open && !hasBeenOpened && (
            <>
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: 'rgba(26,115,232,0.25)',
                animation: 'pulseRing 2s ease-out infinite',
              }} />
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: 'rgba(26,115,232,0.15)',
                animation: 'pulseRing 2s ease-out infinite 0.6s',
              }} />
            </>
          )}
          {/* Subtle pulse every 5s after first open */}
          {!open && hasBeenOpened && (
            <span style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'rgba(26,115,232,0.2)',
              animation: 'subtlePulse 5s ease-in-out infinite',
            }} />
          )}
          <button type="button" onClick={() => setOpen(p => !p)}
            aria-label="Chat öffnen"
            style={{
              position: 'relative', width: 58, height: 58, borderRadius: '50%',
              background: '#1A73E8', border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(26,115,232,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.08)'
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(26,115,232,0.55)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(26,115,232,0.45)'
            }}
          >
            {open
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
              : <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /></svg>}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes botDot {
          0%, 60%, 100% { opacity: 0.4; transform: scale(1); }
          30%            { opacity: 1;   transform: scale(1.3); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes subtlePulse {
          0%, 80%, 100% { transform: scale(1);   opacity: 0; }
          90%           { transform: scale(1.5); opacity: 0.3; }
        }
        @keyframes teaserIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes msgFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes chipFadeIn {
          from { opacity: 0; transform: translateY(6px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  )
}
