const values = [
  {
    icon: '🎯',
    title: 'Ergebnisorientiert',
    desc: 'Wir messen uns an Ihrem Erfolg — nicht an unserem Aufwand.',
  },
  {
    icon: '🤝',
    title: 'Partnerschaftlich',
    desc: 'Wir sind langfristige Partner, keine einmaligen Dienstleister.',
  },
  {
    icon: '⚡',
    title: 'Schnelle Umsetzung',
    desc: 'Von der Idee zum produktiven Chatbot in unter 2 Wochen.',
  },
  {
    icon: '🔒',
    title: 'DSGVO-konform',
    desc: 'Alle Daten bleiben in Europa. Datenschutz ist kein Afterthought.',
  },
]

const team = [
  {
    name: 'Max Müller',
    role: 'CEO & KI-Stratege',
    initials: 'MM',
    color: '#1A73E8',
  },
  {
    name: 'Sara Schmidt',
    role: 'Head of Development',
    initials: 'SS',
    color: '#0d47a1',
  },
  {
    name: 'Tim Wagner',
    role: 'Customer Success',
    initials: 'TW',
    color: '#1565c0',
  },
]

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '100px 24px',
        background: 'white',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 80,
          alignItems: 'center',
          marginBottom: 100,
        }}>
          {/* Left: text */}
          <div>
            <span style={{
              display: 'inline-block',
              fontSize: 13,
              fontWeight: 700,
              color: '#1A73E8',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: 16,
            }}>
              Über Bot Space
            </span>

            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              color: '#0d1117',
              marginBottom: 20,
              letterSpacing: '-0.8px',
              lineHeight: 1.15,
            }}>
              Wir machen KI für den Mittelstand greifbar
            </h2>

            <p style={{
              fontSize: 17,
              color: '#6b7280',
              lineHeight: 1.7,
              marginBottom: 20,
            }}>
              Bot Space wurde gegründet mit einer klaren Mission: KI-gestützte
              Automatisierung soll nicht nur Konzernen vorbehalten sein. Wir bringen
              leistungsstarke Chatbot-Technologie in den deutschen Mittelstand.
            </p>

            <p style={{
              fontSize: 17,
              color: '#6b7280',
              lineHeight: 1.7,
              marginBottom: 36,
            }}>
              Unser Team aus KI-Experten, Entwicklern und Customer-Success-Spezialisten
              begleitet Sie von der ersten Idee bis zur skalierbaren Lösung — und bleibt
              dabei immer an Ihrer Seite.
            </p>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {[
                { n: '50+', label: 'Erfolgreiche Projekte' },
                { n: '3', label: 'Jahre Erfahrung' },
                { n: '100%', label: 'Made in Germany' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 30, fontWeight: 800, color: '#1A73E8', lineHeight: 1 }}>
                    {s.n}
                  </div>
                  <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4, fontWeight: 500 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: values grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
          }}>
            {values.map(v => (
              <div
                key={v.title}
                style={{
                  background: '#f9fafb',
                  borderRadius: 16,
                  padding: '24px 20px',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#e8f0fe'
                  e.currentTarget.style.borderColor = '#c5d8fb'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#f9fafb'
                  e.currentTarget.style.borderColor = '#f0f0f0'
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{v.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0d1117', marginBottom: 6 }}>
                  {v.title}
                </div>
                <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>
                  {v.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team section */}
        <div>
          <h3 style={{
            textAlign: 'center',
            fontSize: 28,
            fontWeight: 800,
            color: '#0d1117',
            marginBottom: 48,
            letterSpacing: '-0.5px',
          }}>
            Das Team hinter Bot Space
          </h3>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 32,
            flexWrap: 'wrap',
          }}>
            {team.map(member => (
              <div
                key={member.name}
                style={{
                  textAlign: 'center',
                  padding: '32px 24px',
                  borderRadius: 20,
                  border: '1.5px solid #f0f0f0',
                  minWidth: 200,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#1A73E8'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(26,115,232,0.1)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#f0f0f0'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${member.color}, ${member.color}cc)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'white',
                  boxShadow: `0 4px 15px ${member.color}40`,
                }}>
                  {member.initials}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0d1117', marginBottom: 4 }}>
                  {member.name}
                </div>
                <div style={{ fontSize: 13, color: '#6b7280' }}>{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
