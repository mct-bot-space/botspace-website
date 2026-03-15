export default function Footer() {
  return (
    <footer style={{
      background: '#0d1117',
      padding: '48px 24px 32px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 48,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ marginBottom: 16 }}>
              <img
                src="/Logo-Text-White.png"
                alt="Bot Space Logo"
                style={{ height: 64, width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
              KI-Chatbots für den deutschen Mittelstand. Made in Germany.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16 }}>
              Navigation
            </div>
            {[
              { label: 'Vorteile', href: '#benefits' },
              { label: 'Demo', href: '#demo-chat' },
              { label: 'Preise', href: '#pricing' },
              { label: 'Kontakt', href: '#contact' },
            ].map(l => (
              <a key={l.label} href={l.href} style={{
                display: 'block',
                fontSize: 14,
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                marginBottom: 10,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Pakete */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16 }}>
              Pakete
            </div>
            {['Starter', 'Pro', 'Enterprise'].map(l => (
              <a key={l} href="#pricing" style={{
                display: 'block',
                fontSize: 14,
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                marginBottom: 10,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Kontakt */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16 }}>
              Kontakt
            </div>
            <a href="mailto:info@bot-space.de" style={{
              display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.55)',
              textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'white')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              info@bot-space.de
            </a>
            <a href="tel:+4917687000474" style={{
              display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.55)',
              textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'white')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              +49 176 87000474
            </a>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>
              Dudenhofen, Deutschland
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            © 2026 MCT Commerce – Alle Rechte vorbehalten
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Datenschutz', 'Impressum', 'AGB'].map(l => (
              <a key={l} href="#" style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.3)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
