import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { service, formData } = await request.json();
    
    if (service === 'bewerbung-bundle') {
      const { background, specialRequests, email, tone, applications } = formData;
      
      const results = [];
      
      // Process each job application
      for (let i = 0; i < applications.length; i++) {
        const job = applications[i];
        
        if (!job.jobDetails.trim()) continue; // Skip empty applications
        
        const prompt = `Du bist ein deutscher Bewerbungsexperte mit Enterprise-KI. Erstelle ein professionelles Anschreiben für folgende Stelle:

Firmenname: ${job.companyName}
Position: ${job.position}

Stellenausschreibung:
${job.jobDetails}

Kandidaten-Hintergrund:
${background}

Zusätzliche Wünsche: ${specialRequests || 'Keine speziellen Wünsche'}

Tonfall: ${tone}

Erstelle ein ATS-optimiertes Anschreiben mit:
- Professioneller Struktur (Anrede, Einleitung, Hauptteil, Schluss)
- Keywords aus der Stellenausschreibung
- Konkrete Beispiele aus dem Hintergrund
- Passendem Tonfall
- Maximal 1 Seite
- Sofort einsatzbereit

Antworte nur mit dem Anschreiben, ohne weitere Erklärungen.`;

        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1000,
          temperature: 0.7,
        });

        const coverLetter = completion.choices[0]?.message?.content || 'Fehler bei der Generierung';
        
        results.push({
          company: job.companyName,
          position: job.position,
          coverLetter: coverLetter
        });
      }

      // Send email with all cover letters
      const emailContent = `
        <h2>Deine 3 Bewerbungsschreiben</h2>
        <p>Hier sind deine maßgeschneiderten Anschreiben:</p>
        
        ${results.map((result, index) => `
          <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3>Bewerbung ${index + 1}: ${result.company} - ${result.position}</h3>
            <div style="white-space: pre-wrap; font-family: Arial, sans-serif; line-height: 1.6;">
              ${result.coverLetter}
            </div>
          </div>
        `).join('')}
        
        <p><strong>Tipp:</strong> Passe die Anschreiben leicht an deine persönlichen Umstände an.</p>
      `;

      // TODO: Implement email sending
      console.log('Bundle results:', results);
      
      return NextResponse.json({ 
        success: true, 
        message: '3 Bewerbungsschreiben erstellt',
        results: results
      });
    }
    
    return NextResponse.json({ error: 'Unsupported service' }, { status: 400 });
  } catch (error) {
    console.error('Process order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 