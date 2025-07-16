export default function DatenschutzPage() {
  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="service-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&h=600&fit=crop" 
            alt="Datenschutz" 
            className="hero-bg"
          />
          <div className="hero-overlay">
            <div className="container">
              <div className="service-hero-content">
                <h1 className="service-hero-title">Datenschutzerklärung</h1>
                <p className="service-hero-subtitle">
                  Transparenz und Sicherheit Ihrer Daten
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-form-section section-padding">
        <div className="container">
          <div className="service-form-wrapper">
            <div className="service-form-header">
              <h2>Datenschutzerklärung</h2>
              <p>Stand: Dezember 2024</p>
            </div>

            <div className="service-form" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ textAlign: 'left', lineHeight: '1.8' }}>
                <h3>1. Verantwortlicher</h3>
                <p>
                  <strong>Tim Frenkel</strong><br />
                  Einzelunternehmen<br />
                  Ringstraße 34<br />
                  24103 Kiel<br />
                  Telefon: 017642747786<br />
                  E-Mail: info@loopnex.de<br />
                  Website: https://ki-textstudio.vercel.app
                </p>

                <h3>2. Erhebung und Verarbeitung personenbezogener Daten</h3>
                <p>
                  Wir erheben und verarbeiten personenbezogene Daten nur im notwendigen Umfang und ausschließlich für die in dieser Datenschutzerklärung genannten Zwecke.
                </p>

                <h4>2.1 Automatisch erfasste Daten</h4>
                <p>
                  Bei Ihrem Besuch auf unserer Website werden automatisch folgende Informationen erfasst:
                </p>
                <ul>
                  <li>IP-Adresse</li>
                  <li>Browser-Typ und -Version</li>
                  <li>Betriebssystem</li>
                  <li>Referrer-URL</li>
                  <li>Zugriffszeit</li>
                  <li>Besuchte Seiten</li>
                </ul>

                <h4>2.2 Von Ihnen bereitgestellte Daten</h4>
                <p>
                  Bei der Nutzung unserer Services erheben wir:
                </p>
                <ul>
                  <li>E-Mail-Adresse (für die Zusendung der Ergebnisse)</li>
                  <li>Jobdetails und Bewerbungsinformationen</li>
                  <li>Lebenslauf (optional)</li>
                  <li>LinkedIn-Profil (optional)</li>
                  <li>Zusätzliche Wünsche und Anforderungen</li>
                </ul>

                <h3>3. Zweck der Datenverarbeitung</h3>
                <p>
                  Wir verarbeiten Ihre Daten für folgende Zwecke:
                </p>
                <ul>
                  <li>Bereitstellung unserer KI-gestützten Textoptimierungs-Services</li>
                  <li>Verarbeitung von Zahlungen über Stripe</li>
                  <li>Zusendung der optimierten Texte per E-Mail</li>
                  <li>Verbesserung unserer Services</li>
                  <li>Technische Administration der Website</li>
                </ul>

                <h3>4. Rechtsgrundlagen</h3>
                <p>
                  Die Verarbeitung Ihrer Daten erfolgt auf folgenden Rechtsgrundlagen:
                </p>
                <ul>
                  <li><strong>Art. 6 Abs. 1 lit. b DSGVO:</strong> Erfüllung des Vertrags</li>
                  <li><strong>Art. 6 Abs. 1 lit. a DSGVO:</strong> Ihre Einwilligung (für optionale Daten)</li>
                  <li><strong>Art. 6 Abs. 1 lit. f DSGVO:</strong> Berechtigte Interessen (Website-Funktionalität)</li>
                </ul>

                <h3>5. Cookies</h3>
                <p>
                  Wir verwenden Cookies für folgende Zwecke:
                </p>
                <ul>
                  <li><strong>Notwendige Cookies:</strong> Für die Grundfunktionen der Website</li>
                  <li><strong>Analyse-Cookies:</strong> Zur Verbesserung der Website-Performance (nur mit Ihrer Einwilligung)</li>
                  <li><strong>Marketing-Cookies:</strong> Für personalisierte Inhalte (nur mit Ihrer Einwilligung)</li>
                </ul>

                <h3>6. Externe Dienstleister</h3>
                <p>
                  Wir arbeiten mit folgenden Dienstleistern zusammen:
                </p>
                <ul>
                  <li><strong>Stripe:</strong> Zahlungsabwicklung (Datenschutzerklärung: <a href="https://stripe.com/privacy" target="_blank" rel="noopener">stripe.com/privacy</a>)</li>
                  <li><strong>OpenAI:</strong> KI-Textgenerierung (Datenschutzerklärung: <a href="https://openai.com/privacy" target="_blank" rel="noopener">openai.com/privacy</a>)</li>
                  <li><strong>Vercel:</strong> Hosting (Datenschutzerklärung: <a href="https://vercel.com/privacy" target="_blank" rel="noopener">vercel.com/privacy</a>)</li>
                </ul>

                <h3>7. Datenübertragung</h3>
                <p>
                  Ihre Daten werden nur an die oben genannten Dienstleister übertragen, soweit dies für die Erfüllung unserer Services erforderlich ist. Eine Weitergabe an Dritte erfolgt nicht.
                </p>

                <h3>8. Speicherdauer</h3>
                <p>
                  Wir speichern Ihre Daten nur so lange, wie es für die genannten Zwecke erforderlich ist:
                </p>
                <ul>
                  <li>Website-Logs: 30 Tage</li>
                  <li>Service-Daten: Bis zur Erfüllung des Auftrags + 30 Tage</li>
                  <li>Zahlungsdaten: Entsprechend gesetzlicher Vorgaben</li>
                </ul>

                <h3>9. Ihre Rechte</h3>
                <p>
                  Sie haben folgende Rechte:
                </p>
                <ul>
                  <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über Ihre gespeicherten Daten verlangen</li>
                  <li><strong>Berichtigungsrecht:</strong> Sie können falsche Daten berichtigen lassen</li>
                  <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer Daten verlangen</li>
                  <li><strong>Einschränkungsrecht:</strong> Sie können die Verarbeitung einschränken lassen</li>
                  <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung widersprechen</li>
                  <li><strong>Datenübertragbarkeit:</strong> Sie können Ihre Daten in einem strukturierten Format erhalten</li>
                </ul>

                <h3>10. Kontakt</h3>
                <p>
                  Für Fragen zum Datenschutz erreichen Sie uns unter:<br />
                  E-Mail: info@loopnex.de<br />
                  Telefon: 017642747786<br />
                  Adresse: Tim Frenkel, Ringstraße 34, 24103 Kiel
                </p>

                <h3>11. Beschwerderecht</h3>
                <p>
                  Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren:
                </p>
                <p>
                  Unabhängiges Landeszentrum für Datenschutz Schleswig-Holstein<br />
                  Holstenstraße 98<br />
                  24103 Kiel<br />
                  Telefon: 0431 988-1200<br />
                  E-Mail: mail@datenschutzzentrum.de
                </p>

                <h3>12. Änderungen</h3>
                <p>
                  Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren. Die jeweils aktuelle Version ist auf unserer Website verfügbar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 