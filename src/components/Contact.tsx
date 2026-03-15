import { useState } from 'react'

const CONTACT_WEBHOOK = 'https://mctecommerce.app.n8n.cloud/webhook/bot-space-contact'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    anliegen: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(null)

    try {
      const res = await fetch(CONTACT_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
          source: 'bot-space-website',
        }),
      })

      if (!res.ok) throw new Error('Server error')
      setSubmitted(true)
    } catch {
      // Fallback: open mailto
      const subject = encodeURIComponent(`[Bot Space] ${form.anliegen || 'Kontaktanfrage'} von ${form.name}`)
      const body = encodeURIComponent(
        `Name: ${form.name}\nUnternehmen: ${form.company}\nE-Mail: ${form.email}\nTelefon: ${form.phone || '-'}\nAnliegen: ${form.anliegen}\n\nNachricht:\n${form.message}`
      )
      window.location.href = `mailto:info@bot-space.de?subject=${subject}&body=${body}`
      setSubmitted(true)
    } finally {
      setSending(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: '1.5px solid #e5e7eb',
    fontSize: 15,
    color: '#111827',
    outline: 'none',
    transition: 'border-color 0.2s',
    background: 'white',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: '#374151',
    marginBottom: 6,
  }

  return (
    <section
      id="contact"
      style={{
        padding: '100px 24px',
        background: 'linear-gradient(135deg, #0d1117 0%, #1a2332 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: -200,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 800,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,115,232,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 80,
          alignItems: 'start',
        }}>
          {/* Left: CTA text */}
          <div>
            <span style={{
              display: 'inline-block',
              fontSize: 13,
              fontWeight: 700,
              color: '#60a5fa',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: 16,
            }}>
              Kontakt
            </span>

            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 46px)',
              fontWeight: 800,
              color: 'white',
              marginBottom: 20,
              letterSpacing: '-1px',
              lineHeight: 1.1,
            }}>
              Lass uns sprechen
            </h2>

            <p style={{
              fontSize: 17,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.7,
              marginBottom: 40,
            }}>
              Du hast eine Frage oder willst direkt loslegen? Schreib uns — wir melden uns innerhalb von 24 Stunden.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Kostenloses Erstgespräch',
                'Individuelle Analyse',
                'Konkreter Umsetzungsplan',
                'Antwort innerhalb von 24h',
              ].map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'rgba(26,115,232,0.3)',
                    border: '1px solid rgba(26,115,232,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)' }}>{b}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 48, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="mailto:info@bot-space.de" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 15,
                }}>
                  <span>✉️</span> info@bot-space.de
                </a>
                <a href="tel:+4917687000474" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 15,
                }}>
                  <span>📞</span> +49 176 87000474
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>
                  <span>📍</span> Dudenhofen, Deutschland
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{
            background: 'white',
            borderRadius: 24,
            padding: '40px 36px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#0d1117', marginBottom: 12 }}>
                  Nachricht gesendet!
                </h3>
                <p style={{ color: '#6b7280', fontSize: 16, lineHeight: 1.6 }}>
                  Wir melden uns innerhalb von 24 Stunden bei dir.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0d1117', marginBottom: 28 }}>
                  Kontaktanfrage senden
                </h3>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Max Mustermann"
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = '#1A73E8')}
                        onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Unternehmen *</label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Muster GmbH"
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = '#1A73E8')}
                        onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>E-Mail *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="max@muster-gmbh.de"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#1A73E8')}
                      onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+49 176 ..."
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#1A73E8')}
                      onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Anliegen *</label>
                    <select
                      name="anliegen"
                      required
                      value={form.anliegen}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={e => (e.target.style.borderColor = '#1A73E8')}
                      onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                    >
                      <option value="">Bitte auswählen...</option>
                      <option value="Angebot anfragen">Angebot anfragen</option>
                      <option value="Technische Frage">Technische Frage</option>
                      <option value="Partnerschaft">Partnerschaft</option>
                      <option value="Sonstiges">Sonstiges</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Nachricht</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Wie können wir dir helfen?"
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                      onFocus={e => (e.target.style.borderColor = '#1A73E8')}
                      onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                    />
                  </div>

                  {error && (
                    <div style={{ fontSize: 14, color: '#ef4444', textAlign: 'center' }}>{error}</div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    style={{
                      background: sending ? '#93c5fd' : '#1A73E8',
                      color: 'white',
                      padding: '15px 24px',
                      borderRadius: 10,
                      border: 'none',
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: sending ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 4px 15px rgba(26,115,232,0.35)',
                    }}
                    onMouseEnter={e => {
                      if (!sending) {
                        e.currentTarget.style.background = '#1557b0'
                        e.currentTarget.style.transform = 'translateY(-1px)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!sending) {
                        e.currentTarget.style.background = '#1A73E8'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }
                    }}
                  >
                    {sending ? 'Wird gesendet...' : 'Nachricht senden'}
                  </button>

                  <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', lineHeight: 1.5 }}>
                    Mit dem Absenden stimmst du unserer{' '}
                    <a href="#" style={{ color: '#1A73E8' }}>Datenschutzerklärung</a> zu.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
