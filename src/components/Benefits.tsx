const benefits = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#1A73E8" />
        <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Kein Lead verloren',
    desc: 'Sofortantwort, auch nachts. Jeder Besucher bekommt in Sekunden eine Antwort — bevor er zur Konkurrenz geht.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="18" rx="3" fill="#1A73E8" />
        <path d="M7 9h10M7 13h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Weniger Telefonstress',
    desc: 'Standardfragen werden automatisch beantwortet. Dein Team kümmert sich nur noch um das Wesentliche.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#1A73E8" />
        <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Termine ohne Aufwand',
    desc: 'Interessenten buchen direkt im Chat ihren Termin — ohne Hin-und-Her per Mail oder Telefon.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#1A73E8" />
      </svg>
    ),
    title: 'Einmal einrichten',
    desc: 'Kein Personalaufwand für Routineanfragen. Der Bot arbeitet rund um die Uhr — ohne Pause, ohne Krankheitstage.',
  },
]

export default function Benefits() {
  return (
    <section
      id="benefits"
      style={{
        padding: '100px 24px',
        background: '#fafafa',
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
            Dein Vorteil
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
          Was sich für dich ändert
        </h2>

        <p style={{
          textAlign: 'center',
          fontSize: 18,
          color: '#6b7280',
          maxWidth: 480,
          margin: '0 auto 64px',
          lineHeight: 1.6,
        }}>
          Weniger Stress. Mehr Kunden. Ab dem ersten Tag.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}>
          {benefits.map(b => (
            <div
              key={b.title}
              style={{
                background: 'white',
                borderRadius: 16,
                padding: '32px 28px',
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
                {b.icon}
              </div>
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#0d1117',
                marginBottom: 10,
                lineHeight: 1.3,
              }}>
                {b.title}
              </h3>
              <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.6 }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
