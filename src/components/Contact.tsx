import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    package: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production: send to backend/CRM
    setSubmitted(true)
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
      {/* Background glow */}
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
              Kontakt aufnehmen
            </span>

            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 46px)',
              fontWeight: 800,
              color: 'white',
              marginBottom: 20,
              letterSpacing: '-1px',
              lineHeight: 1.1,
            }}>
              Starten Sie Ihre KI-Transformation heute
            </h2>

            <p style={{
              fontSize: 17,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.7,
              marginBottom: 40,
            }}>
              Vereinbaren Sie jetzt ein kostenloses 30-Minuten-Gespräch und erfahren
              Sie, wie ein KI-Chatbot Ihr Unternehmen konkret voranbringt.
            </p>

            {/* Benefits */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Kostenloses Erstgespräch ohne Verpflichtung',
                'Individuelle Analyse Ihrer Anforderungen',
                'Konkreter Umsetzungsplan & ROI-Schätzung',
                'Antwort innerhalb von 24 Stunden',
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

            {/* Contact info */}
            <div style={{ marginTop: 48, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="mailto:hallo@bot-space.de" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 15,
                }}>
                  <span>✉️</span> hallo@bot-space.de
                </a>
                <a href="tel:+4989123456789" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 15,
                }}>
                  <span>📞</span> +49 89 123 456 789
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>
                  <span>📍</span> München, Deutschland
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
                <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#0d1117', marginBottom: 12 }}>
                  Vielen Dank!
                </h3>
                <p style={{ color: '#6b7280', fontSize: 16, lineHeight: 1.6 }}>
                  Ihre Anfrage ist bei uns eingegangen. Wir melden uns innerhalb
                  von 24 Stunden bei Ihnen.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0d1117', marginBottom: 28 }}>
                  Kostenlose Beratung anfragen
                </h3>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Vor- & Nachname *</label>
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
                    <label style={labelStyle}>E-Mail-Adresse *</label>
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
                    <label style={labelStyle}>Telefonnummer</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+49 89 123 456 789"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#1A73E8')}
                      onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Interessiertes Paket</label>
                    <select
                      name="package"
                      value={form.package}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={e => (e.target.style.borderColor = '#1A73E8')}
                      onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                    >
                      <option value="">Paket auswählen...</option>
                      <option value="starter">STARTER – 990€ + 149€/Mo</option>
                      <option value="pro">PRO – 1.990€ + 299€/Mo</option>
                      <option value="enterprise">ENTERPRISE – 3.990€ + 599€/Mo</option>
                      <option value="custom">Individuelles Angebot</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Ihre Nachricht</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Beschreiben Sie kurz Ihren Anwendungsfall..."
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                      onFocus={e => (e.target.style.borderColor = '#1A73E8')}
                      onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: '#1A73E8',
                      color: 'white',
                      padding: '15px 24px',
                      borderRadius: 10,
                      border: 'none',
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 4px 15px rgba(26,115,232,0.35)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#1557b0'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#1A73E8'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    Jetzt kostenlos beraten lassen →
                  </button>

                  <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', lineHeight: 1.5 }}>
                    Mit dem Absenden stimmen Sie unserer{' '}
                    <a href="#" style={{ color: '#1A73E8' }}>Datenschutzerklärung</a> zu.
                    Ihre Daten werden nicht an Dritte weitergegeben.
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
