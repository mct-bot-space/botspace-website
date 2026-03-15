import ChatWidget from './ChatWidget'

export default function DemoChat() {
  return (
    <section
      id="demo-chat"
      style={{
        padding: '100px 24px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f0f7ff 100%)',
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
            Live Demo
          </span>
        </div>

        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(24px, 4vw, 40px)',
          fontWeight: 800,
          color: '#0d1117',
          marginBottom: 16,
          letterSpacing: '-0.8px',
          lineHeight: 1.15,
        }}>
          Teste den Bot Space Assistenten live
        </h2>

        <p style={{
          textAlign: 'center',
          fontSize: 18,
          color: '#6b7280',
          maxWidth: 520,
          margin: '0 auto 48px',
          lineHeight: 1.6,
        }}>
          Stell ihm deine Fragen — oder buche direkt deinen Demo-Termin.
        </p>

        {/* Embedded Chat */}
        <div style={{
          maxWidth: 480,
          margin: '0 auto',
        }}>
          <ChatWidget embedded />
        </div>
      </div>
    </section>
  )
}
