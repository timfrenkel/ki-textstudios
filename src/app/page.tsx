import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            KI Text Studio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professionelle KI-optimierte Texte für Bewerbung, Dating und Social Media
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Link href="/bewerbung" className="group">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-600">
                Bewerbung optimieren
              </h3>
              <p className="text-gray-600">
                Professionelle Anschreiben und Lebensläufe mit KI-Power
              </p>
            </div>
          </Link>

          <Link href="/dating" className="group">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-600">
                Dating-Profil
              </h3>
              <p className="text-gray-600">
                Attraktive Profile für Dating-Apps und Partnerbörsen
              </p>
            </div>
          </Link>

          <Link href="/bio" className="group">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-600">
                Social Media Bio
              </h3>
              <p className="text-gray-600">
                Überzeugende Bios für LinkedIn, Instagram und Co.
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
} 