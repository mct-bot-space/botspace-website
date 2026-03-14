const solutions = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="#1A73E8"/>
        <path d="M7 9h10M7 13h7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Intelligenter Kundensupport',
    desc: 'Unser KI-Chatbot beantwortet häufige Fragen sofort, rund um die Uhr — ohne Wartezeit.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="18" rx="2" fill="#1A73E8"/>
        <path d="M8 10h8M8 14h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="15" r="3" fill="white"/>
        <path d="M15 15h2M16 14v2" stroke="#1A73E8" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Lead-Qualifizierung',
    desc: 'Qualifizieren Sie Leads automatisch und übergeben Sie heiße Kontakte direkt an Ihren Vertrieb.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#1A73E8"/>
        <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Terminvereinbarung',
    desc: 'Lassen Sie Interessenten direkt im Chat Termine buchen — vollautomatisch und ohne Medienbrüche.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    title: 'System-Integration',
    desc: 'Nahtlose Anbindung an Ihr CRM, Helpdesk oder ERP — für einen reibungslosen Workflow.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 3h18v18H3V3z" rx="2" fill="#1A73E8"/>
        <path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Mehrsprachiger Support',
    desc: 'Kommunizieren Sie mit Kunden in deren Muttersprache — automatisch und ohne Mehraufwand.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="#1A73E8" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Analytics & Reporting',
    desc: 'Verstehen Sie Ihre Kunden besser durch detaillierte Auswertungen aller Chatbot-Interaktionen.',
  },
]

export default function Solutions() {
  return (
    <section
      id="solutions"
      style={{
        padding: '100px 24px',
        background: 'white',
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
            Unsere Leistungen
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
          Alles, was Ihr KI-Chatbot braucht
        </h2>

        <p style={{
          textAlign: 'center',
          fontSize: 18,
          color: '#6b7280',
          maxWidth: 520,
          margin: '0 auto 64px',
          lineHeight: 1.6,
        }}>
          Von der ersten Anfrage bis zur vollständigen Integration —
          wir liefern alles aus einer Hand.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 28,
        }}>
          {solutions.map(s => (
            <div
              key={s.title}
              style={{
                padding: '32px 28px',
                borderRadius: 16,
                border: '1.5px solid #f0f0f0',
                transition: 'all 0.25s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#1A73E8'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(26,115,232,0.1)'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#f0f0f0'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                background: '#e8f0fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
                {s.icon}
              </div>
              <h3 style={{
                fontSize: 17,
                fontWeight: 700,
                color: '#0d1117',
                marginBottom: 10,
                lineHeight: 1.3,
              }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 14.5, color: '#6b7280', lineHeight: 1.65 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
