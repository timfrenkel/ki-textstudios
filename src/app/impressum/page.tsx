export default function ImpressumPage() {
  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="service-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&h=600&fit=crop" 
            alt="Impressum" 
            className="hero-bg"
          />
          <div className="hero-overlay">
            <div className="container">
              <div className="service-hero-content">
                <h1 className="service-hero-title">Impressum</h1>
                <p className="service-hero-subtitle">
                  Rechtliche Informationen
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
              <h2>Impressum</h2>
              <p>Angaben gemäß § 5 TMG</p>
            </div>

            <div className="service-form" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ textAlign: 'left', lineHeight: '1.8' }}>
                <h3>Angaben zum Diensteanbieter</h3>
                <p>
                  <strong>Tim Frenkel</strong><br />
                  Einzelunternehmen<br />
                  Ringstraße 34<br />
                  24103 Kiel
                </p>

                <h3>Kontakt</h3>
                <p>
                  <strong>E-Mail:</strong> info@loopnex.de<br />
                  <strong>Telefon:</strong> 017642747786<br />
                  <strong>Website:</strong> https://ki-textstudio.vercel.app
                </p>

                <h3>Vertreten durch</h3>
                <p>
                  Tim Frenkel<br />
                  Inhaber
                </p>

                <h3>Registereintrag</h3>
                <p>
                  Als Einzelunternehmen nicht eintragungspflichtig im Handelsregister.
                </p>

                <h3>Steuernummer</h3>
                <p>
                  Steuernummer: 20/0128/01662<br />
                  <em>Umsatzsteuer-ID wird nur bei grenzüberschreitendem EU-Handel benötigt.</em>
                </p>

                <h3>Berufsaufsichtsbehörde</h3>
                <p>
                  Nicht zutreffend für diese Tätigkeit.
                </p>

                <h3>Redaktionell verantwortlich</h3>
                <p>
                  Tim Frenkel<br />
                  Ringstraße 34<br />
                  24103 Kiel
                </p>

                <h3>EU-Streitschlichtung</h3>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr/</a><br />
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>

                <h3>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h3>
                <p>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>

                <h3>Haftung für Inhalte</h3>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
                  unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p>
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
                  Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt 
                  der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden 
                  Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>

                <h3>Haftung für Links</h3>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                  Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
                  verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die 
                  verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. 
                  Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p>
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte 
                  einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige 
                  Links umgehend entfernen.
                </p>

                <h3>Urheberrecht</h3>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
                  Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb 
                  der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. 
                  Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch 
                  gestattet.
                </p>
                <p>
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte 
                  Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem 
                  auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei 
                  Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>

                <h3>Quelle</h3>
                <p>
                  <em>e-recht24.de</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 