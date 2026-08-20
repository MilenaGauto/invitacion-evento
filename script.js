// ============================================
// 1. CONFIGURACIÓN Y SEGURIDAD
// ============================================
// Clave para desbloquear la invitación
const PIN_CORRECTO = "bautismo2026";

// Número de WhatsApp ofuscado en Base64
const T_ENCODED = "NTQ5MzQ4MjIzMDkxNA==";

// Fecha del evento: Domingo 6 de Septiembre de 2026, 09:00 hs
const FECHA_EVENTO = new Date("2026-09-06T09:00:00").getTime();


// ============================================
// 2. CONTROL DE ACCESO (PIN)
// ============================================
function iniciarElementosInteractivos() {
  actualizarCuentaRegresiva();
  iniciarIntersectionObserver();
}

function verificarAcceso() {
  const pin = document.getElementById("passInput").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (pin === PIN_CORRECTO) {
    document.getElementById("gatekeeper").style.display = "none";
    document.getElementById("contenidoPrivado").style.display = "block";
    sessionStorage.setItem("acceso_invitacion", "true");
    
    // Inicia animaciones y cuenta regresiva al desbloquear
    iniciarElementosInteractivos();
  } else {
    errorMsg.style.display = "block";
  }
}

// Mantener sesión activa si ya ingresó el código en la misma pestaña
if (sessionStorage.getItem("acceso_invitacion") === "true") {
  document.getElementById("gatekeeper").style.display = "none";
  document.getElementById("contenidoPrivado").style.display = "block";
  iniciarElementosInteractivos();
}


// ============================================
// 3. CUENTA REGRESIVA CON EFECTO ZOOM
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
    void el.offsetWidth; // Forzar reflow para reiniciar la animación CSS
    el.classList.add('tick');
    valoresAnteriores[id] = valor;
  }
}

setInterval(actualizarCuentaRegresiva, 1000);


// ============================================
// 4. ANIMACIONES AL SCROLL (IntersectionObserver)
// ============================================
function iniciarIntersectionObserver() {
  const elementosReveal = document.querySelectorAll('.reveal');

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('in-view');
        observador.unobserve(entrada.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elementosReveal.forEach((el) => observador.observe(el));
}


// ============================================
// 5. ENVÍO A WHATSAPP
// ============================================
const form = document.getElementById('rsvpForm');
const successMsg = document.getElementById('successMsg');

form.addEventListener('submit', function (e) {
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

  const urlWhatsApp = `https://wa.me/${3482230914}?text=${encodeURIComponent(mensaje)}`;

  const boton = form.querySelector('.btn-whatsapp');
  boton.classList.add('sending');

  form.hidden = true;
  successMsg.hidden = false;

  setTimeout(() => {
    window.open(urlWhatsApp, '_blank');
  }, 700);
});
