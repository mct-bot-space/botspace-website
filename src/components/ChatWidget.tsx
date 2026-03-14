import { useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  role: 'bot' | 'user'
  text: string
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'bot',
      text: 'Hallo! Ich bin der Bot-Space Assistent. Wie kann ich dir helfen?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { id: Date.now(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(
        'https://mctecommerce.app.n8n.cloud/webhook-test/bot-space-chatbot',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nachricht: text, kunde: 'padel-heintz' }),
        }
      )

      const data = await res.json()
      const reply = data?.antwort || 'Ich konnte leider keine Antwort erhalten.'

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, role: 'bot', text: reply },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          text: 'Verbindungsfehler – bitte versuche es erneut.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            width: 380,
            height: 520,
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9999,
            overflow: 'hidden',
            fontFamily: 'inherit',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: '#1A73E8',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l4.93-1.38C8.42 21.5 10.15 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.71 0-3.3-.49-4.65-1.33L4 20l1.33-3.35C4.49 15.3 4 13.71 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
                  Bot-Space Assistent
                </div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>
                  Antwortet sofort
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: 8,
                width: 32,
                height: 32,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 18,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              background: '#f8faff',
            }}
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '78%',
                    padding: '10px 14px',
                    borderRadius:
                      msg.role === 'user'
                        ? '18px 18px 4px 18px'
                        : '18px 18px 18px 4px',
                    background: msg.role === 'user' ? '#1A73E8' : '#fff',
                    color: msg.role === 'user' ? '#fff' : '#1a1a2e',
                    fontSize: 14,
                    lineHeight: 1.5,
                    boxShadow:
                      msg.role === 'bot'
                        ? '0 1px 4px rgba(0,0,0,0.08)'
                        : 'none',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading dots */}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '18px 18px 18px 4px',
                    background: '#fff',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    display: 'flex',
                    gap: 5,
                    alignItems: 'center',
                  }}
                >
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#1A73E8',
                        display: 'inline-block',
                        animation: 'botDot 1.2s infinite',
                        animationDelay: `${i * 0.2}s`,
                        opacity: 0.4,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '12px 14px',
              borderTop: '1px solid #eef0f5',
              display: 'flex',
              gap: 8,
              background: '#fff',
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Nachricht schreiben…"
              disabled={loading}
              style={{
                flex: 1,
                border: '1.5px solid #e0e7ef',
                borderRadius: 10,
                padding: '10px 14px',
                fontSize: 14,
                outline: 'none',
                background: loading ? '#f5f5f5' : '#fff',
                color: '#1a1a2e',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#1A73E8')}
              onBlur={e => (e.currentTarget.style.borderColor = '#e0e7ef')}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                background:
                  loading || !input.trim() ? '#b0c8f5' : '#1A73E8',
                border: 'none',
                borderRadius: 10,
                width: 42,
                height: 42,
                cursor: loading || !input.trim() ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label="Chat öffnen"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 58,
          height: 58,
          borderRadius: '50%',
          background: '#1A73E8',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(26,115,232,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
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
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
        )}
      </button>

      {/* Dot animation keyframes */}
      <style>{`
        @keyframes botDot {
          0%, 60%, 100% { opacity: 0.4; transform: scale(1); }
          30% { opacity: 1; transform: scale(1.3); }
        }
        @media (max-width: 480px) {
          /* Chat window full-width on very small screens */
          .chat-window-mobile {
            width: calc(100vw - 32px) !important;
            right: 16px !important;
          }
        }
      `}</style>
    </>
  )
}
