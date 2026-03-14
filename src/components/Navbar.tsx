import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Leistungen', href: '#solutions' },
    { label: 'Preise', href: '#pricing' },
    { label: 'Über uns', href: '#about' },
    { label: 'Kontakt', href: '#contact' },
  ]

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: '#1A73E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="white"/>
              </svg>
            </div>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#111827', letterSpacing: '-0.3px' }}>
              Bot<span style={{ color: '#1A73E8' }}>Space</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden-mobile">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: 'none',
                  color: '#374151',
                  fontSize: 15,
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1A73E8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#374151')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a
              href="#contact"
              style={{
                background: '#1A73E8',
                color: 'white',
                padding: '10px 22px',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: 600,
                transition: 'all 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1557b0')}
              onMouseLeave={e => (e.currentTarget.style.background = '#1A73E8')}
            >
              Kostenlos beraten lassen
            </a>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
              }}
              className="show-mobile"
              aria-label="Menü öffnen"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {mobileOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
                ) : (
                  <>
                    <path d="M4 6h16M4 12h16M4 18h16" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            background: 'white',
            borderTop: '1px solid #f3f4f6',
            padding: '16px 0 20px',
          }}>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '12px 0',
                  color: '#374151',
                  textDecoration: 'none',
                  fontSize: 16,
                  fontWeight: 500,
                  borderBottom: '1px solid #f9fafb',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </header>
  )
}
