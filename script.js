const openInvite = document.getElementById("openInvite");
const invitation = document.getElementById("invitation");
const envelope = document.getElementById("envelope");
const openHint = document.getElementById("openHint");
const rsvpButton = document.getElementById("rsvpButton");
const rsvpResult = document.getElementById("rsvpResult");

function openLetter() {
  if (envelope.classList.contains("opened")) return;
  envelope.classList.add("opened");
  invitation.classList.add("revealed");
  openHint.textContent = "Tu invitación está abierta ♡";
  openInvite.innerHTML = '<span class="button-icon">✦</span> Invitación abierta <span class="button-arrow">♡</span>';
}

openInvite.addEventListener("click", () => {
  openLetter();
  invitation.scrollIntoView({ behavior: "smooth", block: "center" });
});
envelope.addEventListener("click", openLetter);

// El botón manda una solicitud al backend seguro de Vercel.
// No pide nombre, correo ni otros datos al invitado.
rsvpButton.addEventListener("click", async () => {
  if (rsvpButton.disabled) return;
  rsvpButton.disabled = true;
  rsvpButton.innerHTML = "Enviando confirmación…";

  try {
    const response = await fetch("/api/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ confirmed: true })
    });
    const result = await response.json();

    if (!response.ok) throw new Error(result.error || "No se pudo enviar.");
    rsvpResult.textContent = "¡Asistencia confirmada! Gracias por acompañar a Juanjo. ♡";
    rsvpButton.innerHTML = "Asistencia confirmada <span>♡</span>";
  } catch (error) {
    rsvpResult.textContent = "No se pudo enviar ahora. Intenta de nuevo en un momento.";
    rsvpButton.innerHTML = 'Confirmar asistencia <span>♡</span>';
    rsvpButton.disabled = false;
  }
});

// Cuenta regresiva al 6 de noviembre de 2026, 8:30 a. m. en Colombia (UTC-5).
const eventDate = new Date("2026-11-06T08:30:00-05:00").getTime();
function updateCountdown() {
  const distance = eventDate - Date.now();
  if (distance <= 0) {
    document.querySelector(".countdown").innerHTML = "<p>¡Hoy es el gran día! ♡</p>";
    return;
  }
  document.getElementById("days").textContent = String(Math.floor(distance / 86400000)).padStart(2, "0");
  document.getElementById("hours").textContent = String(Math.floor((distance / 3600000) % 24)).padStart(2, "0");
  document.getElementById("minutes").textContent = String(Math.floor((distance / 60000) % 60)).padStart(2, "0");
  document.getElementById("seconds").textContent = String(Math.floor((distance / 1000) % 60)).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

document.getElementById("backTop").addEventListener("click", () => {
  document.getElementById("inicio").scrollIntoView({ behavior: "smooth" });
});
