const premios = [
    { texto: "20,000 pesos", valor: 20000 },
    { texto: "10,000 pesos", valor: 10000 },
    { texto: "5,000 pesos", valor: 5000 },
    { texto: "2,000 pesos", valor: 2000 },
    { texto: "1,000 pesos", valor: 1000 },
    { texto: "Vuelve mañana", valor: 0 }
];

let fondoMensual = 100000;
let ganadores = JSON.parse(localStorage.getItem('ganadores')) || [];

const ruletaCanvas = document.getElementById("ruleta");
const ctx = ruletaCanvas.getContext("2d");
const girarBtn = document.getElementById("girarBtn");
const ganadoresList = document.getElementById("ganadoresList");

// Dibujar la ruleta
function dibujarRuleta() {
    const total = premios.length;
    const angulo = (2 * Math.PI) / total;

    premios.forEach((premio, i) => {
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? "#FFD700" : "#FF4500";
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, angulo * i, angulo * (i + 1));
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.font = "14px Arial";
        ctx.fillText(premio.texto, 100, 50 + i * 30);
    });
}

// Girar la ruleta
function girarRuleta() {
    if (fondoMensual <= 0) {
        alert("El fondo mensual ha sido agotado.");
        return;
    }

    const premioIndex = Math.floor(Math.random() * premios.length);
    const premio = premios[premioIndex];

    setTimeout(() => {
        alert(`Has ganado: ${premio.texto}`);

        if (premio.valor > 0) {
            let nombre = prompt("Ingresa tu nombre:");
            if (nombre) {
                let ganador = ganadores.find(g => g.nombre === nombre);
                if (ganador) {
                    ganador.totalGanado += premio.valor;
                } else {
                    ganadores.push({ nombre, totalGanado: premio.valor });
                }
                fondoMensual -= premio.valor;
                guardarGanadores();
                mostrarGanadores();
            }
        }
    }, 3000);
}

function guardarGanadores() {
    localStorage.setItem('ganadores', JSON.stringify(ganadores));
}

function mostrarGanadores() {
    ganadoresList.innerHTML = "";
    ganadores.forEach(g => {
        let div = document.createElement("div");
        div.textContent = `${g.nombre}: ${g.totalGanado} pesos`;
        ganadoresList.appendChild(div);
    });
}

girarBtn.addEventListener("click", girarRuleta);
dibujarRuleta();
mostrarGanadores();
