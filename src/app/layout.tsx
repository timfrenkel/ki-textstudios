import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KI Text Studio',
  description: 'Professionelle KI-optimierte Texte für Bewerbung, Dating und Social Media',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                KI Text Studio
              </h1>
              <nav className="hidden md:flex space-x-8">
                <a href="/bewerbung" className="text-gray-600 hover:text-gray-900">
                  Bewerbung
                </a>
                <a href="/dating" className="text-gray-600 hover:text-gray-900">
                  Dating
                </a>
                <a href="/bio" className="text-gray-600 hover:text-gray-900">
                  Bio
                </a>
              </nav>
            </div>
          </div>
        </header>

        {children}

        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 KI Text Studio. Alle Rechte vorbehalten.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
