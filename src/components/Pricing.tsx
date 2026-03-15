import { useState } from 'react'

const plans = [
  {
    name: 'STARTER',
    price: '990',
    monthly: '149',
    duration: '3 Monate',
    tagline: 'Für kleine Dienstleister & Handwerker',
    color: '#1A73E8',
    highlight: false,
    features: [
      'FAQ-Bot bis 50 Antworten',
      'Branding-Anpassung',
      'E-Mail-Support',
      'Monatlicher Report',
    ],
    notIncluded: [
      'Terminbuchung im Chat',
      'Lead-Qualifizierung',
      'CRM-Integration',
    ],
  },
  {
    name: 'PRO',
    price: '1.990',
    monthly: '299',
    duration: '6 Monate',
    tagline: 'Für Arztpraxen, Immobilienmakler, Dienstleister',
    color: '#1A73E8',
    highlight: true,
    features: [
      'Terminbuchung im Chat',
      'Lead-Qualifizierung',
      'WhatsApp optional',
      'Erweitertes FAQ-System',
      'Prioritäts-Support',
      'Wöchentlicher Report',
    ],
    notIncluded: [
      'CRM-Integration',
      'Multi-Channel',
    ],
  },
  {
    name: 'ENTERPRISE',
    price: '3.990',
    monthly: '599',
    duration: '12 Monate',
    tagline: 'Für E-Commerce & Multi-Standort',
    color: '#1A73E8',
    highlight: false,
    features: [
      'CRM-Integration & Multi-Channel',
      '5.000 Gespräche/Monat',
      'Wöchentliche Optimierung',
      '4h-Reaktionszeit',
      'Custom KI-Training',
      'Dedizierter Account Manager',
      'Alle Pro-Features inklusive',
    ],
    notIncluded: [],
  },
]

export default function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  return (
    <section
      id="pricing"
      style={{
        padding: '100px 24px',
        background: 'linear-gradient(180deg, #fafafa 0%, #f0f7ff 100%)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{
            display: 'inline-block',
            fontSize: 13,
            fontWeight: 700,
            color: '#1A73E8',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
          }}>
            Transparente Preise
          </span>
        </div>

        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 800,
          color: '#0d1117',
          marginBottom: 16,
          letterSpacing: '-0.8px',
          lineHeight: 1.15,
        }}>
          Klare Preise. Kein Kleingedrucktes.
        </h2>

        <p style={{
          textAlign: 'center',
          fontSize: 18,
          color: '#6b7280',
          maxWidth: 500,
          margin: '0 auto 16px',
          lineHeight: 1.6,
        }}>
          Einmalige Einrichtungsgebühr + monatliche Betriebskosten.
        </p>

        <p style={{
          textAlign: 'center',
          fontSize: 14,
          color: '#9ca3af',
          marginBottom: 64,
        }}>
          Alle Preise zzgl. gesetzlicher MwSt.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}>
          {plans.map(plan => (
            <div
              key={plan.name}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
              style={{
                background: plan.highlight ? '#1A73E8' : 'white',
                borderRadius: 20,
                padding: '36px 32px',
                border: plan.highlight
                  ? 'none'
                  : hoveredPlan === plan.name
                    ? '2px solid #1A73E8'
                    : '2px solid #e5e7eb',
                boxShadow: plan.highlight
                  ? '0 20px 60px rgba(26,115,232,0.35)'
                  : hoveredPlan === plan.name
                    ? '0 12px 40px rgba(26,115,232,0.12)'
                    : '0 2px 15px rgba(0,0,0,0.04)',
                transform: plan.highlight
                  ? 'scale(1.03)'
                  : hoveredPlan === plan.name
                    ? 'translateY(-4px)'
                    : 'none',
                transition: 'all 0.25s ease',
                position: 'relative',
              }}
            >
              {plan.highlight && (
                <div style={{
                  position: 'absolute',
                  top: -14,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#FFB800',
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 700,
                  padding: '4px 16px',
                  borderRadius: 100,
                  letterSpacing: '0.5px',
                  whiteSpace: 'nowrap',
                }}>
                  BELIEBTESTE WAHL
                </div>
              )}

              <div style={{ marginBottom: 28 }}>
                <div style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '2px',
                  color: plan.highlight ? 'rgba(255,255,255,0.7)' : '#1A73E8',
                  marginBottom: 8,
                }}>
                  {plan.name}
                </div>
                <div style={{
                  fontSize: 14,
                  color: plan.highlight ? 'rgba(255,255,255,0.75)' : '#6b7280',
                  marginBottom: 20,
                }}>
                  {plan.tagline}
                </div>

                <div style={{ marginBottom: 8 }}>
                  <span style={{
                    fontSize: 48,
                    fontWeight: 800,
                    color: plan.highlight ? 'white' : '#0d1117',
                    lineHeight: 1,
                    letterSpacing: '-1px',
                  }}>
                    {plan.price}€
                  </span>
                  <span style={{
                    fontSize: 14,
                    color: plan.highlight ? 'rgba(255,255,255,0.6)' : '#9ca3af',
                    marginLeft: 4,
                  }}>
                    Einrichtung
                  </span>
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: plan.highlight ? 'rgba(255,255,255,0.15)' : '#f3f4f6',
                  borderRadius: 8,
                  padding: '6px 12px',
                }}>
                  <span style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: plan.highlight ? 'white' : '#0d1117',
                  }}>
                    + {plan.monthly}€
                  </span>
                  <span style={{
                    fontSize: 13,
                    color: plan.highlight ? 'rgba(255,255,255,0.65)' : '#6b7280',
                  }}>
                    /Monat ({plan.duration})
                  </span>
                </div>
              </div>

              <div style={{
                height: 1,
                background: plan.highlight ? 'rgba(255,255,255,0.2)' : '#f0f0f0',
                marginBottom: 24,
              }} />

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {plan.features.map(feat => (
                  <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: plan.highlight ? 'rgba(255,255,255,0.25)' : '#e8f0fe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 1,
                    }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke={plan.highlight ? 'white' : '#1A73E8'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{
                      fontSize: 14,
                      color: plan.highlight ? 'rgba(255,255,255,0.9)' : '#374151',
                      lineHeight: 1.4,
                    }}>
                      {feat}
                    </span>
                  </li>
                ))}
                {plan.notIncluded.map(feat => (
                  <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, opacity: 0.4 }}>
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: '#f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 1,
                    }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M3 3l6 6M9 3l-6 6" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.4, textDecoration: 'line-through' }}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#demo-chat"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '14px 24px',
                  borderRadius: 10,
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 700,
                  transition: 'all 0.2s',
                  background: plan.highlight ? 'white' : '#1A73E8',
                  color: plan.highlight ? '#1A73E8' : 'white',
                  boxShadow: plan.highlight ? '0 4px 15px rgba(0,0,0,0.1)' : 'none',
                }}
                onMouseEnter={e => {
                  if (plan.highlight) {
                    e.currentTarget.style.background = '#f0f7ff'
                  } else {
                    e.currentTarget.style.background = '#1557b0'
                  }
                }}
                onMouseLeave={e => {
                  if (plan.highlight) {
                    e.currentTarget.style.background = 'white'
                  } else {
                    e.currentTarget.style.background = '#1A73E8'
                  }
                }}
              >
                Demo buchen
              </a>
            </div>
          ))}
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: 40,
          fontSize: 14,
          color: '#9ca3af',
        }}>
          Nicht sicher, welches Paket passt?{' '}
          <a href="#demo-chat" style={{ color: '#1A73E8', textDecoration: 'none', fontWeight: 600 }}>
            Frag den Bot — kostenlos & unverbindlich.
          </a>
        </p>
      </div>
    </section>
  )
}
