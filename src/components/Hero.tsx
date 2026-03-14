export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f8f4ff 100%)',
        paddingTop: 72,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative circles */}
      <div style={{
        position: 'absolute',
        top: -200,
        right: -200,
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,115,232,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -150,
        left: -150,
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,115,232,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', width: '100%' }}>
        <div style={{ maxWidth: 760, position: 'relative' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#e8f0fe',
            border: '1px solid #c5d8fb',
            borderRadius: 100,
            padding: '6px 16px',
            marginBottom: 28,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1A73E8' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1A73E8', letterSpacing: '0.3px' }}>
              KI-Chatbots für Unternehmen
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 62px)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#0d1117',
            marginBottom: 24,
            letterSpacing: '-1.5px',
          }}>
            Automatisieren Sie Ihren{' '}
            <span style={{ color: '#1A73E8' }}>Kundenservice</span>{' '}
            mit intelligenten KI-Chatbots
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            lineHeight: 1.6,
            color: '#4b5563',
            marginBottom: 40,
            maxWidth: 580,
          }}>
            Bot Space entwickelt maßgeschneiderte KI-Chatbots, die Ihre Kundenanfragen
            rund um die Uhr bearbeiten — und so Kosten senken und die Kundenzufriedenheit
            messbar steigern.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginBottom: 64 }}>
            <a
              href="#contact"
              style={{
                background: '#1A73E8',
                color: 'white',
                padding: '14px 32px',
                borderRadius: 10,
                textDecoration: 'none',
                fontSize: 16,
                fontWeight: 700,
                boxShadow: '0 4px 15px rgba(26,115,232,0.35)',
                transition: 'all 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#1557b0'
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(26,115,232,0.45)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#1A73E8'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(26,115,232,0.35)'
              }}
            >
              Kostenlose Beratung anfragen
            </a>
            <a
              href="#pricing"
              style={{
                background: 'white',
                color: '#1A73E8',
                padding: '14px 32px',
                borderRadius: 10,
                textDecoration: 'none',
                fontSize: 16,
                fontWeight: 600,
                border: '2px solid #1A73E8',
                transition: 'all 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#e8f0fe'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'white'
              }}
            >
              Preise ansehen
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
            {[
              { value: '24/7', label: 'Verfügbarkeit' },
              { value: '< 2 Sek', label: 'Antwortzeit' },
              { value: '–60%', label: 'Support-Kosten' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#1A73E8', lineHeight: 1.1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2, fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
