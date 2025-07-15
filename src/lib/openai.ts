import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export const generateOptimizedText = async (
  service: 'bewerbung' | 'dating' | 'bio',
  userData: any
) => {
  const prompts = {
    bewerbung: `
Als Experte für professionelle Bewerbungen, optimiere das folgende Anschreiben:

Stellenausschreibung: ${userData.jobDescription}
Aktuelles Anschreiben: ${userData.currentLetter}
Branche: ${userData.industry}
Gewünschte Wirkung: ${userData.style}
Besondere Wünsche: ${userData.specialRequests || 'Keine'}

Erstelle ein professionelles, ATS-optimiertes Anschreiben, das:
- Perfekt zur Stellenausschreibung passt
- Die gewünschte Wirkung erzielt
- Alle relevanten Keywords enthält
- Überzeugend und authentisch wirkt

Antworte nur mit dem optimierten Anschreiben:`,

    dating: `
Als Dating-Experte, optimiere das folgende Dating-Profil:

Aktuelles Profil: ${userData.currentProfile}
Alter: ${userData.age}
Interessen: ${userData.interests}
Gewünschte Wirkung: ${userData.style}
Plattform: ${userData.platform}
Besondere Wünsche: ${userData.specialRequests || 'Keine'}

Erstelle ein unwiderstehliches Dating-Profil, das:
- Authentisch und interessant wirkt
- Die gewünschte Zielgruppe anspricht
- Zum Schreiben animiert
- Positive Eigenschaften hervorhebt

Antworte nur mit dem optimierten Dating-Profil:`,

    bio: `
Als Social Media Experte, optimiere die folgende Bio:

Aktuelle Bio: ${userData.currentBio}
Plattform: ${userData.platform}
Beruf/Bereich: ${userData.profession}
Gewünschte Wirkung: ${userData.style}
Zielgruppe: ${userData.targetAudience}
Besondere Wünsche: ${userData.specialRequests || 'Keine'}

Erstelle eine überzeugende Social Media Bio, die:
- Professionell und einprägsam ist
- Zur Plattform passt
- Die Persönlichkeit widerspiegelt
- Zum Followen/Kontaktieren animiert

Antworte nur mit der optimierten Bio:`
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: prompts[service]
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    })

    return response.choices[0]?.message?.content || 'Fehler bei der Generierung'
  } catch (error) {
    console.error('OpenAI API Error:', error)
    throw new Error('Text-Generierung fehlgeschlagen')
  }
}

export { openai } 