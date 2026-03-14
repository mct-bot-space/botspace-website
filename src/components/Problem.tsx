const problems = [
  {
    icon: '⏰',
    title: 'Langsame Reaktionszeiten',
    desc: 'Kunden warten Stunden oder Tage auf Antworten — und wechseln zur Konkurrenz.',
  },
  {
    icon: '💸',
    title: 'Hohe Supportkosten',
    desc: 'Repetitive Anfragen kosten Ihr Team wertvolle Zeit und treiben die Personalkosten in die Höhe.',
  },
  {
    icon: '🔁',
    title: 'Wiederkehrende Routinefragen',
    desc: 'Bis zu 80% aller Kundenanfragen sind identisch — und könnten automatisiert beantwortet werden.',
  },
  {
    icon: '😤',
    title: 'Unzufriedene Kunden',
    desc: 'Inkonsistente Antworten und lange Wartezeiten schaden Ihrer Marke nachhaltig.',
  },
]

export default function Problem() {
  return (
    <section
      id="problem"
      style={{
        padding: '100px 24px',
        background: '#fafafa',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section label */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{
            display: 'inline-block',
            fontSize: 13,
            fontWeight: 700,
            color: '#1A73E8',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
          }}>
            Das Problem
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
          Ihr Kundenservice kostet mehr,{' '}
          <br />
          als er bringen sollte
        </h2>

        <p style={{
          textAlign: 'center',
          fontSize: 18,
          color: '#6b7280',
          maxWidth: 560,
          margin: '0 auto 64px',
          lineHeight: 1.6,
        }}>
          Viele Unternehmen kämpfen täglich mit denselben Herausforderungen
          im Kundensupport.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}>
          {problems.map(p => (
            <div
              key={p.title}
              style={{
                background: 'white',
                borderRadius: 16,
                padding: '32px 28px',
                border: '1px solid #f0f0f0',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#0d1117',
                marginBottom: 10,
                lineHeight: 1.3,
              }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.6 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
