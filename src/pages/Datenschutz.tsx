import { Link } from 'react-router-dom'

export default function Datenschutz() {
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
          Datenschutzerklärung
        </h1>
        <p style={{ color: '#6b7280', marginBottom: 48, fontSize: 14 }}>
          Zuletzt aktualisiert: März 2026
        </p>

        <Section title="1. Verantwortlicher">
          <p>
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer nationaler Datenschutzgesetze sowie sonstiger
            datenschutzrechtlicher Bestimmungen ist:
          </p>
          <p style={{ marginTop: 12, padding: '16px 20px', background: 'white', border: '1px solid #e5e7eb', borderRadius: 10 }}>
            MCT Commerce – Mika Trauth<br />
            Dudenhofen, Deutschland<br />
            E-Mail: <a href="mailto:info@bot-space.de" style={linkStyle}>info@bot-space.de</a><br />
            Telefon: <a href="tel:+4917687000474" style={linkStyle}>+49 176 87000474</a>
          </p>
        </Section>

        <Section title="2. Erhebung und Verarbeitung personenbezogener Daten">
          <p>
            Wir erheben und verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung unserer Website und Dienstleistungen erforderlich ist
            oder Sie ausdrücklich eingewilligt haben.
          </p>

          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d1117', marginTop: 20, marginBottom: 10 }}>2.1 Kontaktformular</h3>
          <p>
            Wenn Sie uns über das Kontaktformular auf unserer Website eine Anfrage senden, verarbeiten wir folgende Daten:
          </p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li>Name</li>
            <li>Unternehmensname</li>
            <li>E-Mail-Adresse</li>
            <li>Telefonnummer (optional)</li>
            <li>Ihr Anliegen und Ihre Nachricht</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) sowie Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an der Bearbeitung von Kundenanfragen). Die Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage
            und für eine etwaige Kontaktaufnahme genutzt.
          </p>

          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d1117', marginTop: 20, marginBottom: 10 }}>2.2 Chat-Funktion</h3>
          <p>
            Wenn Sie unseren KI-Chatbot auf dieser Website nutzen, verarbeiten wir:
          </p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li>Ihre Chat-Nachrichten und Eingaben</li>
            <li>Eine anonyme Session-ID (zufällig generiert, lokal im Browser gespeichert)</li>
            <li>Im Rahmen der Lead-Qualifizierung: Angaben zu Branche, Unternehmensgröße und Kontaktpräferenzen</li>
            <li>Bei Terminbuchung: Name, E-Mail-Adresse und Telefonnummer</li>
            <li>Optional: Bildanhänge, die Sie selbst hochladen</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
            an der Bereitstellung des interaktiven Dienstes).
          </p>

          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d1117', marginTop: 20, marginBottom: 10 }}>2.3 Lokale Speicherung (localStorage)</h3>
          <p>
            Zur Verbesserung der Nutzererfahrung speichert unsere Website folgende Daten lokal in Ihrem Browser (localStorage):
          </p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li><code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>botspace_session_id</code> – anonyme Sitzungskennung</li>
            <li><code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>botspace_chat_history</code> – Ihre Chatverläufe (max. 50 Nachrichten)</li>
            <li><code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>botspace_bookings_count</code> – Anzahl Ihrer Terminbuchungen</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            Diese Daten werden ausschließlich lokal auf Ihrem Endgerät gespeichert und nicht an unsere Server übertragen, es sei denn,
            Sie senden aktiv eine Nachricht. Sie können diese Daten jederzeit löschen, indem Sie im Chat den Befehl <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>/reset</code> eingeben
            oder den Browser-Speicher manuell leeren.
          </p>
        </Section>

        <Section title="3. Weitergabe von Daten an Dritte">
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d1117', marginTop: 4, marginBottom: 10 }}>3.1 n8n (Workflow-Automatisierung)</h3>
          <p>
            Zur Verarbeitung von Chat-Nachrichten und Kontaktanfragen nutzen wir den Dienst <strong>n8n</strong> (n8n GmbH, Berlin, Deutschland).
            Ihre Eingaben werden über einen verschlüsselten HTTPS-Webhook an unsere n8n-Instanz übertragen, dort verarbeitet und
            an ein KI-Sprachmodell weitergeleitet.
          </p>
          <p style={{ marginTop: 12 }}>
            Mit n8n besteht ein Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO. Die Verarbeitung erfolgt auf Servern
            innerhalb der Europäischen Union.
          </p>

          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d1117', marginTop: 20, marginBottom: 10 }}>3.2 Keine sonstige Weitergabe</h3>
          <p>
            Wir verkaufen, vermieten oder übertragen Ihre personenbezogenen Daten nicht an Dritte, es sei denn, dies ist zur
            Vertragserfüllung erforderlich, Sie haben ausdrücklich eingewilligt oder wir sind gesetzlich dazu verpflichtet.
          </p>
        </Section>

        <Section title="4. Speicherdauer">
          <p>
            Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche
            Aufbewahrungsfristen bestehen. Kontaktanfragen werden nach abschließender Bearbeitung gelöscht, sofern keine gesetzlichen
            Aufbewahrungspflichten entgegenstehen. Chat-Daten in unserem System werden nach 90 Tagen automatisch gelöscht.
          </p>
        </Section>

        <Section title="5. Ihre Rechte">
          <p>Sie haben gegenüber uns folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
          <ul style={{ paddingLeft: 20, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li><strong>Auskunftsrecht</strong> (Art. 15 DSGVO): Sie können Auskunft über die von uns gespeicherten Daten verlangen.</li>
            <li><strong>Berichtigungsrecht</strong> (Art. 16 DSGVO): Sie können die Berichtigung unrichtiger Daten verlangen.</li>
            <li><strong>Löschungsrecht</strong> (Art. 17 DSGVO): Sie können die Löschung Ihrer Daten verlangen, sofern keine Aufbewahrungspflichten entgegenstehen.</li>
            <li><strong>Einschränkungsrecht</strong> (Art. 18 DSGVO): Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.</li>
            <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO): Sie können der Verarbeitung Ihrer Daten auf Basis berechtigter Interessen widersprechen.</li>
            <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO): Sie können Ihre Daten in einem strukturierten, gängigen Format erhalten.</li>
          </ul>
          <p style={{ marginTop: 16 }}>
            Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{' '}
            <a href="mailto:info@bot-space.de" style={linkStyle}>info@bot-space.de</a>
          </p>
          <p style={{ marginTop: 12 }}>
            Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist z. B. der
            Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg bzw. Rheinland-Pfalz.
          </p>
        </Section>

        <Section title="6. Datensicherheit">
          <p>
            Wir treffen technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten gegen zufällige oder vorsätzliche
            Manipulationen, Verlust, Zerstörung oder den Zugriff unberechtigter Personen zu schützen. Die Übertragung von
            Daten zwischen Ihrem Browser und unseren Servern erfolgt ausschließlich verschlüsselt (HTTPS/TLS).
          </p>
        </Section>

        <Section title="7. Aktualität und Änderung dieser Datenschutzerklärung">
          <p>
            Diese Datenschutzerklärung ist aktuell gültig und hat den Stand März 2026. Durch die Weiterentwicklung unserer
            Website und Angebote oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig
            werden, diese Datenschutzerklärung zu ändern.
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
