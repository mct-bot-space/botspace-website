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

const chipStyle: React.CSSProperties = {
  background: '#fff',
  border: '1.5px solid #1A73E8',
  borderRadius: 20,
  padding: '6px 14px',
  fontSize: 13,
  color: '#1A73E8',
  cursor: 'pointer',
  fontWeight: 500,
  transition: 'background 0.15s, color 0.15s',
}

function Chip({ label, onClick }: { label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...chipStyle,
        background: hovered ? '#1A73E8' : '#fff',
        color: hovered ? '#fff' : '#1A73E8',
      }}
    >
      {label}
    </button>
  )
}

// ─── Constants ────────────────────────────────────────────────────────────────

const QUICK_REPLIES = [
  'Was kostet ein Chatbot?',
  'Welche Pakete gibt es?',
  'Wie läuft die Umsetzung ab?',
  'Demo-Gespräch vereinbaren',
]

const GREETING_ID = 1

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [open, setOpen]               = useState(false)
  const [showTeaser, setShowTeaser]   = useState(false)
  const [messages, setMessages]       = useState<Message[]>([
    { id: GREETING_ID, role: 'bot', text: 'Hallo! Ich bin der Bot Space Assistent.\n\nIch beantworte deine Fragen zu KI-Chatbots, unseren Paketen und Preisen — direkt und ohne Wartezeit.\n\nWomit kann ich dir helfen?' },
  ])
  const [input, setInput]             = useState('')
  const [loading, setLoading]         = useState(false)
  const [greetingChipsUsed, setGreetingChipsUsed] = useState(false)
  const [activeAktion, setActiveAktion]           = useState<string | null>(null)
  const [activeSlots, setActiveSlots]             = useState<Slot[]>([])
  const [imagePreview, setImagePreview]           = useState<string | null>(null)
  const [imageError, setImageError]               = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef       = useRef<HTMLInputElement>(null)
  const fileInputRef   = useRef<HTMLInputElement>(null)

  // Teaser nach 3s anzeigen, nach 9s ausblenden
  useEffect(() => {
    const t1 = setTimeout(() => setShowTeaser(true), 3000)
    const t2 = setTimeout(() => setShowTeaser(false), 9000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    if (open) {
      setShowTeaser(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // ─── Image ────────────────────────────────────────────────────────────────

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageError(null)
    if (file.size > 5 * 1024 * 1024) {
      setImageError('Bild zu groß (max. 5 MB).')
      e.target.value = ''
      return
    }
    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  // ─── Send ─────────────────────────────────────────────────────────────────

  const sendMessage = async (overrideText?: string) => {
    const raw  = overrideText ?? input
    const text = sanitize(raw)
    if (!text || loading) return

    // Begrüßungs-Chips verstecken sobald irgendeine Nachricht gesendet wird
    if (!greetingChipsUsed) setGreetingChipsUsed(true)

    const imgToSend = imagePreview

    setMessages(prev => [...prev, {
      id: Date.now(),
      role: 'user',
      text,
      ...(imgToSend ? { image: imgToSend } : {}),
    }])
    setInput('')
    setImagePreview(null)
    setImageError(null)
    setActiveAktion(null)
    setActiveSlots([])
    setLoading(true)

    try {
      const body: Record<string, string> = { nachricht: text, kunde: 'padel-heintz' }
      if (imgToSend) body.bild = imgToSend

      const res  = await fetch('https://mctecommerce.app.n8n.cloud/webhook/bot-space-chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      const reply  = data?.antwort || 'Ich konnte leider keine Antwort erhalten.'
      const aktion = data?.aktion  ?? null
      const slots: Slot[] = Array.isArray(data?.slots) ? data.slots : []

      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: reply }])
      setActiveAktion(aktion)
      if (aktion === 'slots_anzeigen') setActiveSlots(slots)
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'bot',
        text: 'Verbindungsfehler – bitte versuche es erneut.',
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage()
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  const canSend = !loading && (input.trim().length > 0 || imagePreview !== null)

  return (
    <>
      {/* ── Chat Window ── */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 90, right: 24,
          width: 380, height: 520,
          background: '#fff', borderRadius: 16,
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column',
          zIndex: 9999, overflow: 'hidden', fontFamily: 'inherit',
        }}>

          {/* Header */}
          <div style={{
            background: '#1A73E8', padding: '14px 18px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', overflow: 'hidden', flexShrink: 0,
              }}>
                <img src="/Logo-Main-White.png" alt="Bot Space Logo"
                  style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
                  Bot Space Assistent
                </div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>
                  Antwortet sofort
                </div>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} style={{
              background: 'rgba(255,255,255,0.15)', border: 'none',
              borderRadius: 8, width: 32, height: 32, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 18, lineHeight: 1,
            }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px 14px',
            display: 'flex', flexDirection: 'column', gap: 10, background: '#f8faff',
          }}>
            {messages.map((msg, idx) => (
              <div key={msg.id}>
                {/* Bubble */}
                <div style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '78%',
                    padding: idx === 0 ? '12px 14px' : '10px 14px',
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
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
                      : msg.text
                    }
                  </div>
                </div>

                {/* Begrüßungs-Chips: fest unter erster Nachricht, bis Nutzer schreibt */}
                {msg.id === GREETING_ID && !greetingChipsUsed && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 8 }}>
                    {QUICK_REPLIES.map(q => (
                      <Chip key={q} label={q} onClick={() => sendMessage(q)} />
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Loading dots */}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '12px 16px', borderRadius: '18px 18px 18px 4px',
                  background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  display: 'flex', gap: 5, alignItems: 'center',
                }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: '#1A73E8', display: 'inline-block',
                      animation: 'botDot 1.2s infinite',
                      animationDelay: `${i * 0.2}s`, opacity: 0.4,
                    }} />
                  ))}
                </div>
              </div>
            )}

            {/* slot_auswahl → Montag / Sonntag */}
            {!loading && activeAktion === 'slot_auswahl' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 4 }}>
                {['Montag', 'Sonntag'].map(tag => (
                  <Chip key={tag} label={tag} onClick={() => sendMessage(tag)} />
                ))}
              </div>
            )}

            {/* slots_anzeigen → Zeitslot-Objekte */}
            {!loading && activeAktion === 'slots_anzeigen' && activeSlots.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 4 }}>
                {activeSlots.map((slot, i) => (
                  <Chip
                    key={i}
                    label={`🕐 ${slot.label || `${slot.datum} ${slot.uhrzeit}`}`}
                    onClick={() => sendMessage(`Ich möchte den Termin am ${slot.datum} um ${slot.uhrzeit} Uhr buchen`)}
                  />
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '10px 14px 12px', borderTop: '1px solid #eef0f5',
            display: 'flex', flexDirection: 'column', gap: 8,
            background: '#fff', flexShrink: 0,
          }}>
            {/* Image preview */}
            {imagePreview && (
              <div style={{ position: 'relative', width: 60 }}>
                <img src={imagePreview} alt="Vorschau" style={{
                  width: 60, height: 60, objectFit: 'cover', borderRadius: 8,
                  display: 'block', border: '1.5px solid #e0e7ef',
                }} />
                <button type="button" onClick={() => { setImagePreview(null); setImageError(null) }} style={{
                  position: 'absolute', top: -6, right: -6,
                  width: 18, height: 18, borderRadius: '50%',
                  background: '#ef4444', border: 'none', color: '#fff',
                  fontSize: 11, cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', lineHeight: 1,
                }}>✕</button>
              </div>
            )}
            {imageError && (
              <div style={{ fontSize: 12, color: '#ef4444' }}>{imageError}</div>
            )}

            {/* Input row */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {/* Paperclip */}
              <button type="button" onClick={() => fileInputRef.current?.click()} title="Bild anhängen"
                style={{
                  background: 'none', border: '1.5px solid #e0e7ef',
                  borderRadius: 10, width: 40, height: 40,
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0, color: '#6b7280',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#1A73E8'; e.currentTarget.style.color = '#1A73E8' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0e7ef'; e.currentTarget.style.color = '#6b7280' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.41 17.41a2 2 0 01-2.83-2.83l8.49-8.48" />
                </svg>
              </button>

              <input ref={fileInputRef} type="file" accept="image/png,image/jpeg"
                style={{ display: 'none' }} onChange={handleFileChange} />

              <input
                ref={inputRef} type="text" value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Nachricht schreiben…"
                disabled={loading} maxLength={500}
                style={{
                  flex: 1, border: '1.5px solid #e0e7ef', borderRadius: 10,
                  padding: '10px 14px', fontSize: 14, outline: 'none',
                  background: loading ? '#f5f5f5' : '#fff',
                  color: '#1a1a2e', transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#1A73E8')}
                onBlur={e => (e.currentTarget.style.borderColor = '#e0e7ef')}
              />

              <button type="button" onClick={() => sendMessage()} disabled={!canSend} style={{
                background: canSend ? '#1A73E8' : '#b0c8f5',
                border: 'none', borderRadius: 10, width: 42, height: 42,
                cursor: canSend ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Floating Button + Pulse + Teaser ── */}
      <div style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10,
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
          {!open && (
            <>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(26,115,232,0.25)', animation: 'pulseRing 2s ease-out infinite' }} />
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(26,115,232,0.15)', animation: 'pulseRing 2s ease-out infinite 0.6s' }} />
            </>
          )}
          <button type="button" onClick={() => setOpen(prev => !prev)} aria-label="Chat öffnen" style={{
            position: 'relative', width: 58, height: 58, borderRadius: '50%',
            background: '#1A73E8', border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(26,115,232,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(26,115,232,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(26,115,232,0.45)' }}
          >
            {open
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
              : <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /></svg>
            }
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes botDot {
          0%, 60%, 100% { opacity: 0.4; transform: scale(1); }
          30%            { opacity: 1;   transform: scale(1.3); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes teaserIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 480px) {
          .chat-window-mobile {
            width: calc(100vw - 32px) !important;
            right: 16px !important;
          }
        }
      `}</style>
    </>
  )
}
