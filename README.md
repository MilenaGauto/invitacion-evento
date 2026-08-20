# 💌 Invitación Digital Interactiva - Mi Bautismo

Página web interactiva y responsiva diseñada como invitación digital con cuenta regresiva en tiempo real, protección de acceso por código PIN y sistema de confirmación de asistencia (RSVP) integrado directamente con WhatsApp.

---

## ✨ Características

* **Acceso Privado por PIN:** Pantalla de bloqueo inicial para proteger los detalles del evento frente a accesos no autorizados.
* **Diseño Visual & Mobile-First:** Animaciones de entrada suaves, laureles SVG animados y tipografía estilizada (*Playfair Display* y *Jost*).
* **Cuenta Regresiva Dinámica:** Temporizador en tiempo real (días, horas, minutos y segundos) con animación visual en cada cambio de dígito (*tick-zoom*).
* **Confirmación RSVP Directa:** Formulario interactivo que recopila datos (nombre, confirmación, acompañantes y menú especial) y abre WhatsApp con el mensaje estructurado listo para enviar.
* **Privacidad & Seguridad Básica:** 
  * Metaetiquetas `noindex` para evitar la indexación en motores de búsqueda como Google.
  * Número de teléfono ofuscado en formato Base64 en el frontend.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica del contenido.
* **CSS3:** Variables nativas, animaciones `@keyframes`, Flexbox, CSS Grid y diseño responsivo.
* **JavaScript (Vanilla):** Lógica de control de acceso, temporizador de cuenta regresiva, persistencia temporal (`sessionStorage`) e integración con la API universal de WhatsApp (`wa.me`).

---

## 📁 Estructura del Proyecto

```text
├── index.html       # Estructura semántica, metadatos y marcado de secciones
├── style.css        # Estilos, paleta de colores, animaciones y diseño adaptable
├── script.js       # Lógica interactiva (PIN, cuenta regresiva, WhatsApp)
└── README.md        # Documentación del proyecto
