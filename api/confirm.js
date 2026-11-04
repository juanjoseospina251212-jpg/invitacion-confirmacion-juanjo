
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Falta configurar la API Key"
    });
  }

  try {
    const respuesta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Invitación Juanjo <onboarding@resend.dev>",
        to: ["juanjoseospinacordoba1@gmail.com"],
        subject: "Asistencia confirmada para tu confirmación",
        text: `¡Asistencia confirmada para tu confirmación!

Una persona ha confirmado que te acompañará en este día tan especial.

Fecha: Viernes 6 de noviembre de 2026
Hora: 8:30 a. m.
Lugar: Capilla Nuestra Señora de la Presentación

¡Gracias!`
      })
    });

    if (!respuesta.ok) {
      const error = await respuesta.text();
      console.error(error);

      return res.status(500).json({
        error: "No se pudo enviar el correo"
      });
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error al enviar el correo"
    });
  }
}
