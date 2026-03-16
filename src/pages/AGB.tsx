import { Link } from 'react-router-dom'

export default function AGB() {
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
          Allgemeine Geschäftsbedingungen
        </h1>
        <p style={{ color: '#6b7280', marginBottom: 48, fontSize: 14 }}>
          MCT Commerce – Mika Trauth · Stand: März 2026
        </p>

        <Section title="§ 1 Geltungsbereich">
          <p>
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen MCT Commerce, Mika Trauth, Dudenhofen
            (nachfolgend „Anbieter") und Unternehmern im Sinne des § 14 BGB (nachfolgend „Auftraggeber") über die Planung,
            Entwicklung, Implementierung und den Betrieb von KI-gestützten Chatbot-Lösungen sowie damit zusammenhängende
            Dienstleistungen (nachfolgend „Leistungen").
          </p>
          <p style={{ marginTop: 12 }}>
            Entgegenstehende oder abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der Anbieter
            stimmt ihrer Geltung ausdrücklich schriftlich zu.
          </p>
        </Section>

        <Section title="§ 2 Vertragsschluss">
          <p>
            (1) Die Darstellung des Leistungsangebots auf der Website des Anbieters stellt kein rechtlich bindendes Angebot,
            sondern eine Aufforderung zur Abgabe eines Angebots (invitatio ad offerendum) dar.
          </p>
          <p style={{ marginTop: 12 }}>
            (2) Der Auftraggeber gibt durch Absenden des Kontaktformulars oder eine schriftliche Beauftragung ein verbindliches
            Angebot ab. Der Vertrag kommt durch die schriftliche Auftragsbestätigung des Anbieters per E-Mail zustande.
          </p>
          <p style={{ marginTop: 12 }}>
            (3) Der Leistungsumfang ergibt sich aus der jeweiligen Auftragsbestätigung sowie dem gewählten Paket (STARTER, PRO
            oder ENTERPRISE) gemäß der aktuellen Preisliste.
          </p>
        </Section>

        <Section title="§ 3 Leistungsumfang">
          <p>
            (1) Der Anbieter erbringt Leistungen zur Konzeption, Entwicklung und Implementierung von KI-Chatbot-Lösungen auf
            Basis der vereinbarten Pakete. Der genaue Leistungsumfang wird in der Auftragsbestätigung festgelegt.
          </p>
          <p style={{ marginTop: 12 }}>
            (2) <strong>STARTER-Paket</strong>: FAQ-Bot mit bis zu 50 Antworten, Branding-Anpassung, E-Mail-Support,
            monatlicher Reporting-Bericht. Vertragslaufzeit: 3 Monate.
          </p>
          <p style={{ marginTop: 12 }}>
            (3) <strong>PRO-Paket</strong>: Terminbuchung im Chat, Lead-Qualifizierung, optionale WhatsApp-Integration,
            erweitertes FAQ-System, Prioritätssupport, wöchentlicher Reporting-Bericht. Vertragslaufzeit: 6 Monate.
          </p>
          <p style={{ marginTop: 12 }}>
            (4) <strong>ENTERPRISE-Paket</strong>: CRM-Integration, Multi-Channel-Fähigkeit, bis zu 5.000 Gespräche/Monat,
            wöchentliche Optimierung, 4-Stunden-Reaktionszeit, individuelles KI-Training, dedizierter Account Manager,
            alle PRO-Features inklusive. Vertragslaufzeit: 12 Monate.
          </p>
          <p style={{ marginTop: 12 }}>
            (5) Der Anbieter ist berechtigt, zur Erbringung der Leistungen qualifizierte Dritte (Subunternehmer) einzusetzen.
          </p>
        </Section>

        <Section title="§ 4 Mitwirkungspflichten des Auftraggebers">
          <p>
            (1) Der Auftraggeber ist verpflichtet, dem Anbieter alle zur Leistungserbringung erforderlichen Informationen,
            Zugangsdaten und Materialien rechtzeitig und vollständig zur Verfügung zu stellen.
          </p>
          <p style={{ marginTop: 12 }}>
            (2) Der Auftraggeber benennt einen Ansprechpartner, der für Abstimmungen und Freigaben zur Verfügung steht.
          </p>
          <p style={{ marginTop: 12 }}>
            (3) Verzögerungen, die auf unzureichender Mitwirkung des Auftraggebers beruhen, gehen nicht zu Lasten des Anbieters
            und können zu einer entsprechenden Verlängerung vereinbarter Fristen führen.
          </p>
        </Section>

        <Section title="§ 5 Vergütung und Zahlungsbedingungen">
          <p>
            (1) Die Vergütung setzt sich aus einer einmaligen Einrichtungsgebühr sowie einer monatlichen Betriebskostenpauschale
            gemäß dem gewählten Paket zusammen. Alle Preise verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer.
          </p>
          <p style={{ marginTop: 12 }}>
            (2) Die Einrichtungsgebühr ist nach Vertragsabschluss und vor Projektbeginn fällig.
            Die monatlichen Betriebskosten werden monatlich im Voraus in Rechnung gestellt.
          </p>
          <p style={{ marginTop: 12 }}>
            (3) Rechnungen sind innerhalb von 14 Tagen ab Rechnungsstellung ohne Abzug zahlbar.
            Bei Zahlungsverzug ist der Anbieter berechtigt, Verzugszinsen in Höhe von 9 Prozentpunkten über dem jeweiligen
            Basiszinssatz gemäß § 288 Abs. 2 BGB zu berechnen.
          </p>
          <p style={{ marginTop: 12 }}>
            (4) Der Anbieter ist berechtigt, seine Preise mit einer Ankündigungsfrist von 6 Wochen zu Beginn eines neuen
            Abrechnungszeitraums anzupassen.
          </p>
        </Section>

        <Section title="§ 6 Vertragslaufzeit und Kündigung">
          <p>
            (1) Der Vertrag beginnt mit dem in der Auftragsbestätigung genannten Datum und läuft für die vereinbarte
            Mindestvertragslaufzeit (STARTER: 3 Monate, PRO: 6 Monate, ENTERPRISE: 12 Monate).
          </p>
          <p style={{ marginTop: 12 }}>
            (2) Nach Ablauf der Mindestlaufzeit verlängert sich der Vertrag automatisch um jeweils einen weiteren Monat,
            sofern er nicht mit einer Frist von 4 Wochen zum Ende der jeweiligen Laufzeit schriftlich gekündigt wird.
          </p>
          <p style={{ marginTop: 12 }}>
            (3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt
            insbesondere vor, wenn der Auftraggeber trotz Mahnung mit mehr als zwei Monatsbeiträgen in Zahlungsverzug gerät.
          </p>
          <p style={{ marginTop: 12 }}>
            (4) Kündigungen bedürfen der Textform (E-Mail genügt).
          </p>
        </Section>

        <Section title="§ 7 Nutzungsrechte und geistiges Eigentum">
          <p>
            (1) Mit vollständiger Bezahlung der vereinbarten Vergütung räumt der Anbieter dem Auftraggeber ein einfaches,
            nicht übertragbares Nutzungsrecht an den erstellten Leistungsergebnissen für den vereinbarten Verwendungszweck ein.
          </p>
          <p style={{ marginTop: 12 }}>
            (2) Werkzeuge, Frameworks, Methoden und Know-how, die der Anbieter unabhängig vom konkreten Auftrag entwickelt hat
            oder einsetzt, verbleiben im alleinigen Eigentum des Anbieters.
          </p>
          <p style={{ marginTop: 12 }}>
            (3) Der Auftraggeber garantiert, dass von ihm bereitgestellte Inhalte (Texte, Bilder, Marken etc.) frei von
            Rechten Dritter sind und die Nutzung keine Rechte Dritter verletzt.
          </p>
        </Section>

        <Section title="§ 8 Haftung">
          <p>
            (1) Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei schuldhafter Verletzung
            von Leben, Körper und Gesundheit.
          </p>
          <p style={{ marginTop: 12 }}>
            (2) Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung einer wesentlichen Vertragspflicht
            (Kardinalpflicht). In diesem Fall ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt,
            maximal jedoch auf den Betrag der im jeweiligen Vertragsjahr gezahlten Vergütung.
          </p>
          <p style={{ marginTop: 12 }}>
            (3) Der Anbieter übernimmt keine Garantie für die ununterbrochene Verfügbarkeit von Drittsystemen (insbesondere
            KI-Sprachmodelle, Webhooks, Drittanbieter-APIs), auf die der Chatbot-Betrieb angewiesen ist.
          </p>
          <p style={{ marginTop: 12 }}>
            (4) Der Anbieter haftet nicht für Schäden, die durch fehlerhafte oder unvollständige Informationen entstehen,
            die der Auftraggeber bereitgestellt hat.
          </p>
        </Section>

        <Section title="§ 9 Datenschutz">
          <p>
            Beide Parteien verpflichten sich, die geltenden datenschutzrechtlichen Bestimmungen, insbesondere die DSGVO,
            einzuhalten. Soweit der Anbieter im Rahmen der Leistungserbringung personenbezogene Daten des Auftraggebers
            verarbeitet, wird ein Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO abgeschlossen.
            Weitere Informationen enthält unsere <Link to="/datenschutz" style={linkStyle}>Datenschutzerklärung</Link>.
          </p>
        </Section>

        <Section title="§ 10 Vertraulichkeit">
          <p>
            Beide Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erlangten vertraulichen Informationen
            (insbesondere Geschäftsgeheimnisse, technische Konzepte, Kundendaten) gegenüber Dritten vertraulich zu behandeln
            und ausschließlich für Zwecke der Vertragserfüllung zu verwenden. Diese Verpflichtung gilt über das Ende des
            Vertragsverhältnisses hinaus.
          </p>
        </Section>

        <Section title="§ 11 Schlussbestimmungen">
          <p>
            (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG).
          </p>
          <p style={{ marginTop: 12 }}>
            (2) Gerichtsstand für alle Streitigkeiten aus und im Zusammenhang mit diesem Vertrag ist, sofern der Auftraggeber
            Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist, der Sitz
            des Anbieters.
          </p>
          <p style={{ marginTop: 12 }}>
            (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen
            Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung tritt die gesetzlich zulässige Regelung,
            die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.
          </p>
          <p style={{ marginTop: 12 }}>
            (4) Änderungen und Ergänzungen dieser AGB bedürfen der Textform. Dies gilt auch für die Änderung dieser
            Textformklausel.
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
