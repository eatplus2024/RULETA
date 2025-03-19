document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("ruleta");
  const ctx = canvas.getContext("2d");
  const jugarBtn = document.getElementById("jugarBtn");
  const nombreUsuario = document.getElementById("nombreUsuario");
  const historialGanadores = document.getElementById("historialGanadores");
  const auto = document.getElementById("auto");

  const premios = ["$10", "$50", "$100", "GRATIS", "$200", "$500", "SORPRESA", "NADA"];
  const anguloPorPremio = (2 * Math.PI) / premios.length;
  let anguloActual = 0;
  let girando = false;

  function dibujarRuleta() {
    for (let i = 0; i < premios.length; i++) {
      ctx.beginPath();
      ctx.moveTo(250, 250);
      ctx.arc(250, 250, 250, anguloActual + i * anguloPorPremio, anguloActual + (i + 1) * anguloPorPremio);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? "#FFD700" : "#FF4500";
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#000";
      ctx.font = "20px Arial";
      ctx.fillText(premios[i], 180 + 180 * Math.cos(anguloActual + (i + 0.5) * anguloPorPremio),
                   250 + 180 * Math.sin(anguloActual + (i + 0.5) * anguloPorPremio));
    }
  }

  function animarRuleta(callback) {
    let duracion = 8000; // Reducido a 8 segundos
    let tiempoInicio = null;
    let velocidadInicial = 0.2 + Math.random() * 0.2;
    let frenado = velocidadInicial / duracion;

    function animacionRuleta(timestamp) {
      if (!tiempoInicio) tiempoInicio = timestamp;
      let progreso = timestamp - tiempoInicio;
      let velocidad = Math.max(velocidadInicial - frenado * progreso, 0);
      anguloActual += velocidad;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dibujarRuleta();

      if (velocidad > 0) {
        requestAnimationFrame(animacionRuleta);
        moverAuto(velocidad);
      } else {
        let premioIndex = Math.floor(((anguloActual % (2 * Math.PI)) / (2 * Math.PI)) * premios.length);
        let premioGanado = premios[premios.length - 1 - premioIndex];
        callback(premioGanado);
      }
    }

    requestAnimationFrame(animacionRuleta);
  }

  function moverAuto(velocidad) {
    let radio = 250;
    let centroX = 250;
    let centroY = 250;
    let posX = centroX + radio * Math.cos(anguloActual) - 20;
    let posY = centroY + radio * Math.sin(anguloActual) - 10;
    auto.style.transform = `translate(${posX}px, ${posY}px)`;
  }

  function mostrarGanador(premio) {
    if (!nombreUsuario.value) {
      alert("Por favor, ingresa tu nombre antes de jugar.");
      return;
    }

    let nuevoGanador = document.createElement("li");
    nuevoGanador.textContent = `${nombreUsuario.value} ganó: ${premio}`;
    historialGanadores.appendChild(nuevoGanador);
    
    animarConfeti();
  }

  function animarConfeti() {
    for (let i = 0; i < 50; i++) {
      let confeti = document.createElement("div");
      confeti.classList.add("confeti");
      confeti.style.left = `${Math.random() * 100}vw`;
      confeti.style.backgroundColor = ["red", "yellow", "blue", "green", "orange"][Math.floor(Math.random() * 5)];
      confeti.style.animationDuration = `${Math.random() * 2 + 2}s`;
      document.body.appendChild(confeti);
      setTimeout(() => confeti.remove(), 3000);
    }
  }

  jugarBtn.addEventListener("click", function () {
    if (girando) return;
    girando = true;
    animarRuleta((premio) => {
      girando = false;
      mostrarGanador(premio);
    });
  });

  dibujarRuleta();
});
