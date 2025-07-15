import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export const sendOptimizedText = async (
  service: 'bewerbung' | 'dating' | 'bio',
  userEmail: string,
  optimizedText: string,
  userData: any
) => {
  const serviceNames = {
    bewerbung: 'Bewerbung',
    dating: 'Dating-Profil',
    bio: 'Social Media Bio'
  }

  const serviceName = serviceNames[service]

  try {
    // E-Mail an Kunden
    await resend.emails.send({
      from: 'KI Text Studio <noreply@loopnex.de>',
      to: userEmail,
      subject: `Ihre optimierte ${serviceName} ist fertig! 🚀`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a2332; color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0;">KI Text Studio</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.8;">by loopnex</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #1a2332;">Ihre optimierte ${serviceName} ist fertig!</h2>
            <p>Vielen Dank für Ihr Vertrauen. Hier ist Ihr KI-optimierter Text:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #d4af37; margin: 20px 0;">
              <h3 style="color: #1a2332; margin-top: 0;">Ihr optimierter Text:</h3>
              <div style="white-space: pre-wrap; line-height: 1.6; color: #333;">
${optimizedText}
              </div>
            </div>
            
            <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #1a2332; margin-top: 0;">💡 Tipps für beste Ergebnisse:</h4>
              <ul style="color: #333;">
                ${service === 'bewerbung' ? `
                  <li>Passen Sie das Anschreiben ggf. an spezifische Stellendetails an</li>
                  <li>Verwenden Sie eine professionelle E-Mail-Adresse</li>
                  <li>Achten Sie auf fehlerfreie Rechtschreibung</li>
                ` : service === 'dating' ? `
                  <li>Verwenden Sie aktuelle, authentische Fotos</li>
                  <li>Seien Sie ehrlich und authentisch</li>
                  <li>Starten Sie Gespräche mit Bezug zu den Profilinhalten</li>
                ` : `
                  <li>Halten Sie Ihre Bio aktuell</li>
                  <li>Verwenden Sie relevante Hashtags</li>
                  <li>Verlinken Sie zu Ihren wichtigsten Inhalten</li>
                `}
              </ul>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Vielen Dank, dass Sie KI Text Studio gewählt haben!<br>
              Bei Fragen oder weiterem Optimierungsbedarf stehen wir gerne zur Verfügung.
            </p>
          </div>
          
          <div style="background: #1a2332; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2024 KI Text Studio by loopnex. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      `
    })

    // Interne Benachrichtigung
    await resend.emails.send({
      from: 'KI Text Studio <noreply@loopnex.de>',
      to: 'tim@loopnex.de', // Ihre E-Mail
      subject: `Neue ${serviceName} Bestellung abgeschlossen`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Neue Bestellung abgeschlossen ✅</h2>
          <p><strong>Service:</strong> ${serviceName}</p>
          <p><strong>Kunde:</strong> ${userEmail}</p>
          <p><strong>Status:</strong> Automatisch generiert und versendet</p>
          
          <h3>Ursprungsdaten:</h3>
          <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto;">
${JSON.stringify(userData, null, 2)}
          </pre>
          
          <h3>Generierter Text:</h3>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
${optimizedText}
          </div>
        </div>
      `
    })

    return { success: true }
  } catch (error) {
    console.error('Email sending failed:', error)
    throw new Error('E-Mail-Versendung fehlgeschlagen')
  }
}

export { resend } 