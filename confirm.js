// Vercel Serverless Function. Sends the RSVP email using Resend.
// Set RESEND_API_KEY in Vercel Environment Variables before deployment.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  if (!req.body || req.body.confirmed !== true) {
    return res.status(400).json({ error: "Confirmación inválida." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "El correo no está configurado todavía." });
  }

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Invitación de Juanjo <onboarding@resend.dev>",
        to: ["juanjoseospinacordoba1@gmail.com"],
        subject: "Asistencia confirmada para tu confirmación",
        text: "Asistencia confirmada para tu confirmación. Una persona ha confirmado que te acompañará el viernes 6 de noviembre de 2026 a las 8:30 a. m."
      })
    });

    if (!emailResponse.ok) {
      const details = await emailResponse.text();
      console.error("Resend error:", details);
      return res.status(502).json({ error: "El servicio de correo no pudo enviar el mensaje." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return res.status(500).json({ error: "Ocurrió un error enviando el correo." });
  }
}
