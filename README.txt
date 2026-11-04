INVITACIÓN INTERACTIVA DE JUANJO — VERCEL

Incluye:
- index.html
- style.css
- script.js
- api/confirm.js (función backend que envía el correo)

CONFIGURAR ENVÍO DE CORREO
El proyecto usa Resend como proveedor de email. El correo se envía desde el backend de Vercel, no desde el navegador, para no exponer la clave API.

1. Crea una cuenta en Resend: https://resend.com
2. Crea una API Key.
3. En Vercel, abre el proyecto > Settings > Environment Variables.
4. Añade:
   RESEND_API_KEY = tu clave privada de Resend
5. Haz redeploy del proyecto.

Nota importante sobre el remitente:
El código usa onboarding@resend.dev como remitente de prueba. En Resend, para mandar correos a tu Gmail en producción, verifica un dominio que controles y cambia el campo "from" en api/confirm.js por un remitente de ese dominio. No publiques tu API Key en HTML o JavaScript.

DESPLIEGUE
Sube estos archivos a un repositorio GitHub y conéctalo a Vercel, o importa el proyecto en Vercel. La carpeta api se despliega como función serverless.
