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
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#1A73E8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="white"/>
                </svg>
              </div>
              <span style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>
                Bot<span style={{ color: '#1A73E8' }}>Space</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
              KI-Chatbots für den deutschen Mittelstand. Made in Germany.
            </p>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16 }}>
              Leistungen
            </div>
            {['Kundensupport', 'Lead-Qualifizierung', 'Terminvereinbarung', 'Integrationen'].map(l => (
              <a key={l} href="#solutions" style={{
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

          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16 }}>
              Pakete
            </div>
            {['Starter', 'Pro', 'Enterprise', 'Individuell'].map(l => (
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

          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16 }}>
              Unternehmen
            </div>
            {['Über uns', 'Kontakt', 'Datenschutz', 'Impressum'].map(l => (
              <a key={l} href="#" style={{
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
            © 2025 Bot Space GmbH. Alle Rechte vorbehalten.
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
