const canvas = document.getElementById("ruleta");
const ctx = canvas.getContext("2d");
const jugarBtn = document.getElementById("jugarBtn");
const nombreInput = document.getElementById("nombreUsuario");
const nombreBtn = document.getElementById("nombreBtn");
const historial = document.getElementById("historialGanadores");

let nombreUsuario = "";
let anguloActual = 0;
let girando = false;

const premios = [
  { texto: "20,000", valor: 20000 },
  { texto: "10,000", valor: 10000 },
  { texto: "5,000", valor: 5000 },
  { texto: "2,000", valor: 2000 },
  { texto: "1,000", valor: 1000 },
  { texto: "Vuelve mañana", valor: 0 }
];

function dibujarRuleta() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const centroX = canvas.width / 2;
  const centroY = canvas.height / 2;
  const radio = Math.min(centroX, centroY);
  const segmentos = premios.length;
  const anguloPorSegmento = (2 * Math.PI) / segmentos;

  ctx.save();
  ctx.translate(centroX, centroY);
  ctx.rotate((anguloActual * Math.PI) / 180);
  ctx.translate(-centroX, -centroY);

  for (let i = 0; i < segmentos; i++) {
    const angInicio = anguloPorSegmento * i;
    const angFin = angInicio + anguloPorSegmento;

    ctx.beginPath();
    ctx.moveTo(centroX, centroY);
    ctx.arc(centroX, centroY, radio, angInicio, angFin);
    ctx.fillStyle = i % 2 === 0 ? "#ffcc00" : "#ff5733";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();

    ctx.save();
    ctx.translate(centroX, centroY);
    ctx.rotate(angInicio + anguloPorSegmento / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 20px Arial";
    ctx.fillText(premios[i].texto, radio - 10, 10);
    ctx.restore();
  }

  ctx.restore();
}

function girarRuleta() {
  if (girando) return;
  girando = true;

  let tiempo = 8000; // 8 segundos
  let anguloFinal = anguloActual + (Math.random() * 360 + 1080);
  
  let inicio = Date.now();
  function animar() {
    let tiempoPasado = Date.now() - inicio;
    if (tiempoPasado < tiempo) {
      anguloActual += (anguloFinal - anguloActual) * 0.05;
      dibujarRuleta();
      requestAnimationFrame(animar);
    } else {
      anguloActual = anguloFinal;
      mostrarResultado();
      girando = false;
    }
  }
  animar();
}

function mostrarResultado() {
  let indice = Math.floor((anguloActual % 360) / (360 / premios.length));
  let premio = premios[indice];

  alert(`${nombreUsuario}, ¡Ganaste ${premio.texto} pesos!`);
}

nombreBtn.addEventListener("click", () => {
  nombreUsuario = nombreInput.value;
  if (nombreUsuario) jugarBtn.disabled = false;
});

jugarBtn.addEventListener("click", girarRuleta);
dibujarRuleta();
