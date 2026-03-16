import { Link } from 'react-router-dom'

export default function Impressum() {
  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* Nav */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/">
            <img src="/Logo-Text.png" alt="Bot Space" style={{ height: 48, width: 'auto' }} />
          </Link>
          <Link to="/" style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Zurück zur Startseite
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px 80px' }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0d1117', marginBottom: 8, letterSpacing: '-0.5px' }}>
          Impressum
        </h1>
        <p style={{ color: '#6b7280', marginBottom: 48, fontSize: 14 }}>
          Angaben gemäß § 5 TMG
        </p>

        <Section title="Anbieter">
          <p>MCT Commerce</p>
          <p>Mika Trauth</p>
          <p>Milanstraße 6</p>
          <p>67373 Dudenhofen</p>
        </Section>

        <Section title="Kontakt">
          <p>Telefon: <a href="tel:+4917687000474" style={linkStyle}>+49 176 87000474</a></p>
          <p>E-Mail: <a href="mailto:info@bot-space.de" style={linkStyle}>info@bot-space.de</a></p>
        </Section>

        <Section title="Verantwortlich für den Inhalt gemäß § 55 Abs. 2 RStV">
          <p>Mika Trauth</p>
          <p>MCT Commerce</p>
          <p>Milanstraße 6</p>
          <p>67373 Dudenhofen</p>
        </Section>

        <Section title="Umsatzsteuer-ID">
          <p>Sofern eine Umsatzsteuer-Identifikationsnummer vorhanden ist, wird diese hier angegeben.</p>
        </Section>

        <Section title="Streitschlichtung">
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p style={{ marginTop: 12 }}>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </Section>

        <Section title="Haftung für Inhalte">
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
            oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p style={{ marginTop: 12 }}>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
            Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
            Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </Section>

        <Section title="Haftung für Links">
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten
            ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
          <p style={{ marginTop: 12 }}>
            Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
            waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
            jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
            werden wir derartige Links umgehend entfernen.
          </p>
        </Section>

        <Section title="Urheberrecht">
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
            Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts
            bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
          <p style={{ marginTop: 12 }}>
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte
            auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
            Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
            bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
            umgehend entfernen.
          </p>
        </Section>
      </main>

      <PageFooter />
    </div>
  )
}

const linkStyle: React.CSSProperties = {
  color: '#1A73E8',
  textDecoration: 'none',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0d1117', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #e5e7eb' }}>
        {title}
      </h2>
      <div style={{ fontSize: 15, color: '#374151', lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  )
}

function PageFooter() {
  return (
    <footer style={{ background: '#0d1117', padding: '24px', textAlign: 'center' }}>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
        © 2026 MCT Commerce – Alle Rechte vorbehalten
      </p>
    </footer>
  )
}
