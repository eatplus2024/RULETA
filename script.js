// Obtenemos los elementos del DOM
const canvas = document.getElementById("ruleta");
const ctx = canvas.getContext("2d");
const jugarBtn = document.getElementById("jugarBtn");
const historial = document.getElementById("historialGanadores");

// Datos de los premios
// (puedes agregar o quitar según necesites)
const premios = [
  { texto: "20,000", valor: 20000 },
  { texto: "10,000", valor: 10000 },
  { texto: "5,000", valor: 5000 },
  { texto: "2,000", valor: 2000 },
  { texto: "1,000", valor: 1000 },
  { texto: "Vuelve mañana", valor: 0 }
];

// Ángulo inicial de la ruleta
let anguloActual = 0;
// Controla si está girando
let girando = false;

// Función para dibujar la ruleta en el canvas
function dibujarRuleta() {
  // Limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculamos algunos valores
  const centroX = canvas.width / 2;
  const centroY = canvas.height / 2;
  const radio = Math.min(centroX, centroY);
  const segmentos = premios.length;
  const anguloPorSegmento = (2 * Math.PI) / segmentos;

  // Guardar el estado del contexto y trasladar/rotar
  ctx.save();
  ctx.translate(centroX, centroY);
  ctx.rotate((anguloActual * Math.PI) / 180);
  ctx.translate(-centroX, -centroY);

  // Dibujar cada segmento
  for (let i = 0; i < segmentos; i++) {
    // Ángulo inicial y final del segmento
    const angInicio = anguloPorSegmento * i;
    const angFin = angInicio + anguloPorSegmento;

    // Establecer color del segmento
    ctx.beginPath();
    ctx.moveTo(centroX, centroY);
    ctx.arc(centroX, centroY, radio, angInicio, angFin);
    ctx.fillStyle = i % 2 === 0 ? "#ffcc00" : "#ff5733";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();

    // Dibujar texto
    ctx.save();
    ctx.translate(centroX, centroY);
    ctx.rotate(angInicio + anguloPorSegmento / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 20px Arial";
    ctx.fillText(premios[i].texto, radio - 10, 10);
    ctx.restore();
  }

  // Restaurar el contexto original
  ctx.restore();
}

// Función para iniciar el giro de la ruleta
function girarRuleta() {
  if (girando) return;
  girando = true;

  // Calculamos un giro aleatorio
  // De 3 a 6 vueltas completas (cada vuelta = 360°)
  const vueltas = Math.floor(Math.random() * 3) + 3;
  // Ángulo adicional aleatorio entre 0 y 360
  const anguloExtra = Math.floor(Math.random() * 360);
  // Ángulo final
  const anguloFinal = anguloActual + vueltas * 360 + anguloExtra;

  // Velocidad inicial (grados por frame)
  let velocidad = 20;
  // Animación con requestAnimationFrame
  function animar() {
    if (anguloActual < anguloFinal) {
      // Sumar la velocidad al ángulo actual
      anguloActual += velocidad;
      // Ir reduciendo la velocidad para un efecto 'ease-out'
      if (velocidad > 0.2) {
        velocidad *= 0.98; // Ajusta para más o menos inercia
      }
      dibujarRuleta();
      requestAnimationFrame(animar);
    } else {
      // Se alcanzó el ángulo final (o muy cerca)
      anguloActual = anguloFinal;
      dibujarRuleta();
      girando = false;
      mostrarResultado();
    }
  }
  animar();
}

// Función para determinar el resultado según el ángulo final
function mostrarResultado() {
  // Normalizamos el ángulo al rango [0, 360)
  const angNormalizado = (360 - (anguloActual % 360)) % 360;
  // Calculamos el tamaño de cada segmento en grados
  const tamSegmento = 360 / premios.length;
  // Identificamos el índice del premio
  const indice = Math.floor(angNormalizado / tamSegmento);
  const premio = premios[indice];

  if (premio.valor > 0) {
    alert(`¡Felicidades! Has ganado ${premio.texto} pesos`);
    agregarGanador(premio.texto);
  } else {
    alert("Hoy no ganaste, pero mañana tendrás una nueva oportunidad. ¡Te esperamos mañana!");
  }
}

// Función para agregar ganador al historial
function agregarGanador(monto) {
  const li = document.createElement("li");
  li.textContent = `Ganaste: ${monto} pesos`;
  historial.appendChild(li);
}

// Eventos
jugarBtn.addEventListener("click", girarRuleta);
dibujarRuleta(); // Dibujamos la ruleta al cargar
