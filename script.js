// ============================================
// 1. CONFIGURACIÓN DEL EVENTO
// ============================================
// Formato: AAAA-MM-DDTHH:MM:SS
const FECHA_EVENTO = new Date("2026-11-15T21:00:00").getTime();

// Código de país + código de área + número (sin +, sin guiones, sin espacios)
// Ejemplo Argentina: 549 + característica sin 0 + número sin 15
const NUMERO_WHATSAPP = "5493624123456";

// ============================================
// 2. CUENTA REGRESIVA (con efecto zoom al cambiar)
// ============================================
let valoresAnteriores = { days: null, hours: null, minutes: null, seconds: null };

function actualizarCuentaRegresiva() {
  const ahora = new Date().getTime();
  const distancia = FECHA_EVENTO - ahora;

  if (distancia < 0) {
    document.querySelector('.countdown-grid').innerHTML = "<p>¡El evento ha comenzado! 🎉</p>";
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
  const texto = String(valor).padStart(2, '0');

  if (valoresAnteriores[id] !== valor) {
    el.innerText = texto;
    el.classList.remove('tick');
    // Forzar reflow para poder relanzar la animación
    void el.offsetWidth;
    el.classList.add('tick');
    valoresAnteriores[id] = valor;
  }
}

setInterval(actualizarCuentaRegresiva, 1000);
actualizarCuentaRegresiva();

// ============================================
// 3. ANIMACIONES AL HACER SCROLL (IntersectionObserver)
// ============================================
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

// ============================================
// 4. ENVÍO A WHATSAPP
// ============================================
const form = document.getElementById('rsvpForm');
const successMsg = document.getElementById('successMsg');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const asistencia = document.getElementById('asistencia').value;
  const acompanantes = document.getElementById('acompanantes').value;
  const menu = document.getElementById('menu').value.trim() || 'Ninguno';

  // Estructura del mensaje de texto
  const mensaje =
`*CONFIRMACIÓN DE ASISTENCIA* ✉️
---------------------------------
👤 *Nombre:* ${nombre}
📌 *Respuesta:* ${asistencia}
👥 *Acompañantes:* ${acompanantes}
🍽️ *Menú especial:* ${menu}
---------------------------------`;

  // Construcción de la URL universal
  const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

  const boton = form.querySelector('.btn-whatsapp');
  boton.classList.add('sending');

  // Pequeño delay para mostrar el mensaje de éxito antes de redirigir
  form.hidden = true;
  successMsg.hidden = false;

  setTimeout(() => {
    window.open(urlWhatsApp, '_blank');
  }, 700);
});