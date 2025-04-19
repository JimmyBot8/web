let puntos = 0;
const meta = 19;
const mensajesSorpresa = [
  "Mi niña pechocha ❤️",
  "Te amooooooooo 💖",
  "Te amo mi princesita preciosa ❤️",
  "¿Me das un besito? 🫡",
  "Me encantas mi amor 💖",
  "Amameeeeeeeeee",
  "Sos la mejor mi amor ❤️",
  "A tus ordenes preciosa 🫡"
];

const juegoArea = document.getElementById('juego-area');
const puntosDisplay = document.getElementById('puntos');
const cartaDisplay = document.getElementById('carta');
const mensajeMeta = document.getElementById('mensaje-meta');
const portada = document.getElementById('portada');
const iniciarJuegoBtn = document.getElementById('iniciarJuegoBtn');
const mensajeSorpresa = document.getElementById('mensaje-sorpresa');
const cartaFlip = document.getElementById('carta-flip');
const mensajeFinal = document.getElementById('mensaje-final');

function generarCorazon() {
  const corazon = document.createElement('img');
  corazon.src = 'nubes.png'; 
  corazon.alt = 'Yonghee';
  corazon.style.position = 'absolute';
  corazon.style.left = Math.random() * 90 + '%';
  corazon.style.top = Math.random() * 90 + '%';
  corazon.style.width = '50px';
  corazon.style.cursor = 'pointer';

  corazon.addEventListener('click', () => {
    reproducirSonido();
    agregarPunto();
    mostrarMensajeSorpresa();
    corazon.remove();
  });

  juegoArea.appendChild(corazon);
}

function reproducirSonido() {
  const sonido = document.getElementById('sonido-click').cloneNode();
  sonido.play();
}

function agregarPunto() {
  puntos++;
  puntosDisplay.textContent = `Puntos: ${puntos}`;
  if (puntos >= meta) {
    mostrarCarta();
  }
}

function mostrarMensajeSorpresa() {
  const mensaje = mensajesSorpresa[Math.floor(Math.random() * mensajesSorpresa.length)];
  mensajeSorpresa.textContent = mensaje;
  mensajeSorpresa.style.display = 'block';
  mensajeSorpresa.style.opacity = 1;

  setTimeout(() => {
    mensajeSorpresa.style.opacity = 0;
  }, 1500);
}

function mostrarCarta() {
  juegoArea.style.display = 'none';
  mensajeMeta.style.display = 'none';
  puntosDisplay.style.display = 'none';
  mensajeSorpresa.style.display = 'none';
  cartaDisplay.style.display = 'block';
  mensajeFinal.style.display = 'block';
  lanzarConfeti();
}

function lanzarConfeti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 100,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 100,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function iniciarJuego() {
  portada.classList.add('slide-out');

  setTimeout(() => {
    portada.style.display = 'none';
    juegoArea.style.display = 'block';
    puntosDisplay.style.display = 'block';
    mensajeMeta.style.display = 'block';
    setInterval(generarCorazon, 1000);
  }, 1000);
}

iniciarJuegoBtn.addEventListener('click', iniciarJuego);

cartaFlip.addEventListener('click', () => {
  cartaFlip.classList.toggle('flipped');
});
