import OpenAI from 'openai'

export const generateOptimizedText = async (
  service: 'bewerbung' | 'dating' | 'bio',
  userData: any
) => {
  // OpenAI Client bei jedem Aufruf erstellen (für Build-Kompatibilität)
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  })
  const prompts = {
    bewerbung: `
Du bist ein professioneller Bewerbungsschreiber und Karrierecoach mit über 10 Jahren Erfahrung im Recruiting.  
Dein Ziel ist es, ein hoch personalisiertes, strategisch starkes Bewerbungsschreiben zu erstellen, das sowohl menschlich berührt als auch fachlich überzeugt.  
Dabei sprichst du die Sprache der jeweiligen Branche, verwendest Keywords aus der Stellenausschreibung und passt dich dem gewünschten Tonfall an.

Hier sind die Informationen vom Bewerber:

---
🧾 Stellenausschreibung:  
${userData.jobDescription}

👤 Beruflicher Hintergrund & Qualifikationen:  
${userData.currentLetter}

💡 Besondere Hinweise (optional):  
${userData.specialRequests || 'Keine besonderen Hinweise'}

🗣️ Gewünschter Tonfall:  
${userData.style}  
(Beispiele: freundlich-professionell, selbstbewusst, locker-kreativ, sachlich-offiziell)

📂 Zielbranche oder Berufsbereich (falls angegeben):  
${userData.industry}

---

Deine Aufgabe:
1. Analysiere die Stellenausschreibung und extrahiere verdeckt die Schlüsselanforderungen & Prioritäten der Firma (Hard Skills, Soft Skills, Kultur).
2. Verknüpfe die Angaben des Bewerbers gezielt mit den Anforderungen.
3. Verfasse ein professionelles Bewerbungsschreiben mit:
   - Individueller Einleitung mit Bezug zur Stelle/Firma
   - Hauptteil mit passenden Erfahrungen und Erfolgen
   - Klarem Argument, warum diese Person Mehrwert bringt
   - Passendem Call-to-Action
4. Vermeide Floskeln und Standardphrasen. Schreibe konkret, aktiv und lebendig.
5. Verwende relevante Begriffe aus der Stellenausschreibung (für ATS-Systeme).

Stil: Natürlich, professionell, klar. Nicht übertrieben, aber positiv und selbstbewusst.

Antworte nur mit dem fertigen Bewerbungsschreiben – keine Erklärungen.`,

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

// OpenAI client wird jetzt bei jedem Aufruf erstellt 