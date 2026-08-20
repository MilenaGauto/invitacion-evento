// ============================================
// 1. CONFIGURACIÓN Y SEGURIDAD
// ============================================
const PIN_CORRECTO = "bautismo2026";
const T_ENCODED = "NTQ5MzQ4MjIzMDkxNA==";
const FECHA_EVENTO = new Date("2026-09-06T09:00:00").getTime();

// ============================================
// 2. INICIALIZACIÓN
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const gatekeeper = document.getElementById("gatekeeper");
  const contenido = document.getElementById("contenidoPrivado");

  // Si ya ingresó el PIN previamente
  if (sessionStorage.getItem("acceso_invitacion") === "true") {
    if (gatekeeper) gatekeeper.style.display = "none";
    if (contenido) contenido.style.display = "block";
    mostrarTodoYComenzar();
  }

  // Evento formulario PIN
  const passForm = document.getElementById("passForm");
  if (passForm) {
    passForm.addEventListener("submit", (e) => {
      e.preventDefault();
      verificarAcceso();
    });
  }

  // Evento formulario RSVP
  const rsvpForm = document.getElementById("rsvpForm");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", enviarWhatsApp);
  }
});

// ============================================
// 3. VALIDACIÓN DE PIN
// ============================================
function verificarAcceso() {
  const pinInput = document.getElementById("passInput");
  const errorMsg = document.getElementById("errorMsg");
  const gatekeeper = document.getElementById("gatekeeper");
  const contenido = document.getElementById("contenidoPrivado");

  if (pinInput && pinInput.value.trim() === PIN_CORRECTO) {
    if (gatekeeper) gatekeeper.style.display = "none";
    if (contenido) contenido.style.display = "block";
    sessionStorage.setItem("acceso_invitacion", "true");
    
    mostrarTodoYComenzar();
  } else if (errorMsg) {
    errorMsg.style.display = "block";
  }
}

function mostrarTodoYComenzar() {
  actualizarCuentaRegresiva();

  // Forzar que todas las tarjetas se hagan visibles sin depender del scroll
  const elementosReveal = document.querySelectorAll('.reveal');
  elementosReveal.forEach((el) => {
    el.classList.add('in-view');
  });
}

// ============================================
// 4. CUENTA REGRESIVA
// ============================================
let valoresAnteriores = { days: null, hours: null, minutes: null, seconds: null };

function actualizarCuentaRegresiva() {
  const ahora = new Date().getTime();
  const distancia = FECHA_EVENTO - ahora;

  if (distancia < 0) {
    const grid = document.querySelector('.countdown-grid');
    if (grid) grid.innerHTML = "<p>¡El evento ha comenzado! 🎉</p>";
    return;
  }

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  setDigito("days", dias);
  setDigito("hours", horas);
  setDigito("minutes", minutos);
  setDigito("seconds", segundos);
}

function setDigito(id, valor) {
  const el = document.getElementById(id);
  if (!el) return;

  const texto = String(valor).padStart(2, '0');

  if (valoresAnteriores[id] !== valor) {
    el.innerText = texto;
    el.classList.remove('tick');
    void el.offsetWidth;
    el.classList.add('tick');
    valoresAnteriores[id] = valor;
  }
}

setInterval(actualizarCuentaRegresiva, 1000);

// ============================================
// 5. ENVÍO POR WHATSAPP
// ============================================
function enviarWhatsApp(e) {
  e.preventDefault();

  const telefonoReal = atob(T_ENCODED);
  const nombre = document.getElementById('nombre').value.trim();
  const asistencia = document.getElementById('asistencia').value;
  const acompanantes = document.getElementById('acompanantes').value;
  const menu = document.getElementById('menu').value.trim() || 'Ninguno';

  const mensaje =
`*CONFIRMACIÓN DE ASISTENCIA* ✉️
---------------------------------
👤 *Nombre:* ${nombre}
📌 *Respuesta:* ${asistencia}
👥 *Acompañantes:* ${acompanantes}
🍽️ *Menú especial:* ${menu}
---------------------------------`;

  const urlWhatsApp = `https://wa.me/${telefonoReal}?text=${encodeURIComponent(mensaje)}`;
  const form = document.getElementById('rsvpForm');
  const successMsg = document.getElementById('successMsg');

  if (form) form.hidden = true;
  if (successMsg) successMsg.hidden = false;

  setTimeout(() => {
    window.open(urlWhatsApp, '_blank');
  }, 600);
}
