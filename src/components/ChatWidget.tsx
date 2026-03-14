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

interface QualData {
  name: string
  unternehmen: string
  email: string
  telefon: string
  website: string
  branche: string
  support_system: string
  mitarbeiter: string
  anfragen_monatlich: string
  hauptziel: string
}

type QualKey = keyof QualData

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

const QUAL_QUESTIONS = [
  'Wie heißt du und für welches Unternehmen bist du tätig?',
  'Wie lautet deine E-Mail-Adresse und Telefonnummer?',
  'Was ist die URL deiner Website?',
  'Aus welcher Branche kommt dein Unternehmen?',
  'Welches Support-System nutzt du aktuell?',
  'Wie viele Mitarbeiter habt ihr im Kundenservice?',
  'Wie viele Support-Anfragen erhaltet ihr monatlich?',
  'Was ist euer Hauptziel beim Einsatz eines KI-Chatbots?',
]

const QUAL_CHIPS: { label: string; field: QualKey }[][] = [
  [ // step 4
    { label: '🔨 Handwerk', field: 'branche' },
    { label: '🏥 Arztpraxis/Zahnarzt', field: 'branche' },
    { label: '🏠 Immobilien', field: 'branche' },
    { label: '🛒 E-Commerce', field: 'branche' },
    { label: '🍽️ Gastronomie', field: 'branche' },
    { label: '💼 Sonstiges', field: 'branche' },
  ],
  [ // step 5
    { label: '❌ Kein System', field: 'support_system' },
    { label: '📧 Nur E-Mail/Telefon', field: 'support_system' },
    { label: '🤖 Einfacher Chatbot', field: 'support_system' },
    { label: '🎫 Helpdesk-System', field: 'support_system' },
    { label: '⚠️ Schlechtes KI-System', field: 'support_system' },
  ],
  [ // step 6
    { label: '👤 Nur ich', field: 'mitarbeiter' },
    { label: '👥 2 Mitarbeiter', field: 'mitarbeiter' },
    { label: '👨‍👩‍👧 3-5 Mitarbeiter', field: 'mitarbeiter' },
    { label: '🏢 5-10 Mitarbeiter', field: 'mitarbeiter' },
    { label: '🏭 10+ Mitarbeiter', field: 'mitarbeiter' },
  ],
  [ // step 7
    { label: '📊 Unter 50', field: 'anfragen_monatlich' },
    { label: '📊 50-200', field: 'anfragen_monatlich' },
    { label: '📊 200-500', field: 'anfragen_monatlich' },
    { label: '📊 500-1000', field: 'anfragen_monatlich' },
    { label: '📊 Über 1000', field: 'anfragen_monatlich' },
  ],
  [ // step 8
    { label: '📉 Anfragen reduzieren', field: 'hauptziel' },
    { label: '🎯 Leads generieren', field: 'hauptziel' },
    { label: '📅 Terminbuchung automatisieren', field: 'hauptziel' },
    { label: '💰 Kosten senken', field: 'hauptziel' },
  ],
]

const EMPTY_QUAL: QualData = {
  name: '', unternehmen: '', email: '', telefon: '',
  website: '', branche: '', support_system: '',
  mitarbeiter: '', anfragen_monatlich: '', hauptziel: '',
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

function Chip({ label, onClick }: { label: string; onClick: () => void }) {
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
        fontSize: 13,
        color: hov ? '#fff' : '#1A73E8',
        cursor: 'pointer',
        fontWeight: 500,
        transition: 'background 0.15s, color 0.15s',
      }}
    >
      {label}
    </button>
  )
}

// ─── ChatWidget ───────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [sessionId]   = useState<string>(() => getOrCreateSessionId())
  const [open, setOpen]             = useState(false)
  const [showTeaser, setShowTeaser] = useState(false)

  const [messages, setMessages] = useState<Message[]>(() =>
    loadSavedMessages() ?? [{ id: GREETING_ID, role: 'bot', text: GREETING_TEXT }]
  )

  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [imagePreview, setImg]  = useState<string | null>(null)
  const [imageError, setImgErr] = useState<string | null>(null)

  const [greetingChipsUsed, setGreetingChipsUsed] = useState<boolean>(() =>
    loadSavedMessages()?.some(m => m.role === 'user') ?? false
  )

  // Webhook action state
  const [activeAktion, setActiveAktion] = useState<string | null>(null)
  const [activeSlots, setActiveSlots]   = useState<Slot[]>([])

  // Qualification flow
  const [qualStep, setQualStep]   = useState(0)   // 0=inactive, 1–8=current step
  const [qualDone, setQualDone]   = useState(false)
  const [qualData, setQualData]   = useState<QualData>(EMPTY_QUAL)
  const [pendingSlot, setPendingSlot] = useState<Slot | null>(null)

  const bottomRef    = useRef<HTMLDivElement>(null)
  const inputRef     = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Effects ────────────────────────────────────────────────────────────────

  useEffect(() => {
    const t1 = setTimeout(() => setShowTeaser(true), 3000)
    const t2 = setTimeout(() => setShowTeaser(false), 9000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    if (open) { setShowTeaser(false); setTimeout(() => inputRef.current?.focus(), 100) }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    localStorage.setItem('botspace_chat_history', JSON.stringify(messages.slice(-50)))
  }, [messages])

  // ── Image ──────────────────────────────────────────────────────────────────

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImgErr(null)
    if (file.size > 5 * 1024 * 1024) { setImgErr('Bild zu groß (max. 5 MB).'); e.target.value = ''; return }
    const reader = new FileReader()
    reader.onload = () => setImg(reader.result as string)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  // ── Booking send (called after qual completion) ────────────────────────────

  const sendBooking = async (finalQual: QualData, slot: Slot) => {
    const text = `Ich möchte den Termin am ${slot.datum} um ${slot.uhrzeit} Uhr buchen`
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text }])
    setLoading(true)
    try {
      const res = await fetch('https://mctecommerce.app.n8n.cloud/webhook/bot-space-chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nachricht: text,
          session_id: sessionId,
          kunde: 'padel-heintz',
          qualifizierung: finalQual,
        }),
      })
      const data = await res.json()
      if (data?.aktion === 'termin_gebucht') {
        localStorage.setItem('botspace_bookings_count', '1')
      }
      setMessages(prev => [...prev, {
        id: Date.now() + 1, role: 'bot',
        text: data?.antwort ?? '✅ Dein Termin wurde bestätigt! Wir melden uns per E-Mail.',
      }])
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 1, role: 'bot',
        text: 'Verbindungsfehler – bitte versuche es erneut.',
      }])
    } finally {
      setLoading(false)
    }
  }

  // ── Qualification helpers ──────────────────────────────────────────────────

  const advanceQual = (updated: QualData, fromStep: number, slot: Slot) => {
    const next = fromStep + 1
    if (next <= 8) {
      setQualStep(next)
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now(), role: 'bot', text: QUAL_QUESTIONS[next - 1] }])
      }, 300)
    } else {
      // Qual complete → send booking
      setQualStep(0)
      setQualDone(true)
      setQualData(updated)
      sendBooking(updated, slot)
    }
  }

  const handleQualChip = (label: string, field: QualKey) => {
    const step = qualStep
    const slot = pendingSlot!
    const updated: QualData = { ...qualData, [field]: label }
    setQualData(updated)
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: label }])
    advanceQual(updated, step, slot)
  }

  // ── Slot selection → start qual flow ──────────────────────────────────────

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

    setPendingSlot(slot)
    setActiveAktion(null)
    setActiveSlots([])

    if (qualDone) {
      // Skip qual, book directly
      sendBooking(qualData, slot)
      return
    }

    // Add user selection bubble, then start qual
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: slot.label }])
    setQualStep(1)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(), role: 'bot',
        text: 'Perfekt! 📅 Bevor ich deinen Termin verbindlich bestätige, habe ich noch ein paar kurze Fragen.\n\n' + QUAL_QUESTIONS[0],
      }])
    }, 300)
  }

  // ── Send message (webhook) ─────────────────────────────────────────────────

  const sendMessage = async (
    overrideText?: string,
    extraPayload?: Record<string, unknown>,
  ) => {
    const raw  = overrideText ?? input
    const text = sanitize(raw)
    if (!text || loading) return

    if (!greetingChipsUsed) setGreetingChipsUsed(true)

    const imgToSend   = imagePreview
    const currentStep = qualStep

    setMessages(prev => [...prev, {
      id: Date.now(), role: 'user', text,
      ...(imgToSend ? { image: imgToSend } : {}),
    }])
    setInput('')
    setImg(null)
    setImgErr(null)

    // ── Qual flow: intercept free-text steps 1–3 ──────────────────────────
    if (currentStep >= 1 && currentStep <= 3) {
      const updated = { ...qualData }
      if (currentStep === 1) {
        const parts = text.split(',').map(p => p.trim())
        updated.name = parts[0] || text
        updated.unternehmen = parts.slice(1).join(',').trim()
      } else if (currentStep === 2) {
        const parts = text.split(',').map(p => p.trim())
        updated.email   = parts[0] || text
        updated.telefon = parts.slice(1).join(',').trim()
      } else {
        updated.website = text
      }
      setQualData(updated)
      advanceQual(updated, currentStep, pendingSlot!)
      return
    }

    // ── Normal webhook call ────────────────────────────────────────────────
    setActiveAktion(null)
    setActiveSlots([])
    setLoading(true)

    try {
      const body: Record<string, unknown> = {
        nachricht: text,
        session_id: sessionId,
        kunde: 'padel-heintz',
      }
      if (imgToSend)   body.bild = imgToSend
      if (extraPayload) Object.assign(body, extraPayload)

      const res  = await fetch('https://mctecommerce.app.n8n.cloud/webhook/bot-space-chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data  = await res.json()
      const reply: string      = data?.antwort ?? 'Ich konnte leider keine Antwort erhalten.'
      const aktion: string | null = data?.aktion ?? null
      const slots: Slot[]      = Array.isArray(data?.slots) ? data.slots : []

      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: reply }])

      if (aktion === 'termin_gebucht') {
        localStorage.setItem('botspace_bookings_count', '1')
      } else if (aktion === 'slots_anzeigen') {
        // Show slots directly — qual happens AFTER slot selection
        setActiveAktion('slots_anzeigen')
        setActiveSlots(slots)
      } else {
        setActiveAktion(aktion)
      }
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 1, role: 'bot',
        text: 'Verbindungsfehler – bitte versuche es erneut.',
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage()
  }

  const canSend       = !loading && (input.trim().length > 0 || imagePreview !== null)
  const showQualChips = !loading && qualStep >= 4 && qualStep <= 8

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
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
            background: '#1A73E8', padding: '14px 18px', flexShrink: 0,
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
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>Bot Space Assistent</div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>Antwortet sofort</div>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} style={{
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8,
              width: 32, height: 32, cursor: 'pointer', color: '#fff', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px 14px',
            display: 'flex', flexDirection: 'column', gap: 10, background: '#f8faff',
          }}>
            {messages.map((msg, idx) => (
              <div key={msg.id}>
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
                        width: '100%', maxWidth: 200, borderRadius: 8, marginBottom: 6, display: 'block',
                      }} />
                    )}
                    {msg.role === 'bot'
                      ? <span dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }} />
                      : msg.text
                    }
                  </div>
                </div>

                {/* Greeting chips */}
                {msg.id === GREETING_ID && !greetingChipsUsed && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 8 }}>
                    {QUICK_REPLIES.map(q => <Chip key={q} label={q} onClick={() => sendMessage(q)} />)}
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
                {['Montag', 'Sonntag'].map(tag => (
                  <Chip key={tag} label={tag} onClick={() => sendMessage(tag)} />
                ))}
              </div>
            )}

            {/* slots_anzeigen: Slot-Chips + "Keiner passt?" Link */}
            {!loading && activeAktion === 'slots_anzeigen' && activeSlots.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {activeSlots.map((slot, i) => (
                    <Chip
                      key={i}
                      label={slot.label || `${slot.datum} — ${slot.uhrzeit} Uhr`}
                      onClick={() => handleSlotSelect(slot)}
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

            {/* Qualification chips (steps 4–8) */}
            {showQualChips && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 4 }}>
                {QUAL_CHIPS[qualStep - 4].map(({ label, field }) => (
                  <Chip key={label} label={label} onClick={() => handleQualChip(label, field)} />
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div style={{
            padding: '10px 14px 12px', borderTop: '1px solid #eef0f5',
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
            {imageError && <div style={{ fontSize: 12, color: '#ef4444' }}>{imageError}</div>}

            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button type="button" onClick={() => fileInputRef.current?.click()} title="Bild anhängen"
                style={{
                  background: 'none', border: '1.5px solid #e0e7ef', borderRadius: 10,
                  width: 40, height: 40, cursor: 'pointer', flexShrink: 0, color: '#6b7280',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
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
                placeholder={qualStep >= 1 && qualStep <= 3 ? 'Deine Antwort…' : 'Nachricht schreiben…'}
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
                cursor: canSend ? 'pointer' : 'default', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}>
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
          <button type="button" onClick={() => setOpen(p => !p)} aria-label="Chat öffnen" style={{
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
      `}</style>
    </>
  )
}
