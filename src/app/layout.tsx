import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KI Text Studio - Professionelle KI-optimierte Texte',
  description: 'Perfekte Bewerbungen, unwiderstehliche Dating-Profile und überzeugende Social Media Bios. KI-optimiert für Ihren Erfolg.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <header className="header">
          <div className="container">
            <div className="header-content">
              <a href="/" className="logo">
                <h1>KI Text Studio</h1>
              </a>
              <nav className="nav">
                <a href="/bewerbung" className="nav-link">
                  Bewerbung
                </a>
                <a href="/dating" className="nav-link">
                  Dating
                </a>
                <a href="/bio" className="nav-link">
                  Bio
                </a>
              </nav>
            </div>
          </div>
        </header>

        {children}

        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>KI Text Studio</h3>
                <p>Professionelle KI-optimierte Texte für Ihren Erfolg</p>
              </div>
              <div className="footer-section">
                <h4>Services</h4>
                <ul>
                  <li><a href="/bewerbung">Bewerbung optimieren</a></li>
                  <li><a href="/dating">Dating-Profil</a></li>
                  <li><a href="/bio">Social Media Bio</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Support</h4>
                <ul>
                  <li><a href="/kontakt">Kontakt</a></li>
                  <li><a href="/impressum">Impressum</a></li>
                  <li><a href="/datenschutz">Datenschutz</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 KI Text Studio. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
