const canvas = document.getElementById("ruleta");
const ctx = canvas.getContext("2d");
const boton = document.getElementById("girar");
const mensaje = document.getElementById("mensaje");

const premios = ["$10", "$50", "$100", "Gracias por participar", "$20", "$200", "Vuelve a intentarlo", "$500"];
const colores = ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#800080", "#ff1493"];
let anguloInicio = 0;
let girando = false;

function dibujarRuleta() {
    const cantidad = premios.length;
    const angulo = (2 * Math.PI) / cantidad;
    
    for (let i = 0; i < cantidad; i++) {
        ctx.beginPath();
        ctx.fillStyle = colores[i % colores.length];
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, anguloInicio + i * angulo, anguloInicio + (i + 1) * angulo);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        
        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(anguloInicio + (i + 0.5) * angulo);
        ctx.fillText(premios[i], 100, 10);
        ctx.restore();
    }
}

dibujarRuleta();

function obtenerResultado(anguloFinal) {
    const cantidad = premios.length;
    const angulo = (2 * Math.PI) / cantidad;
    let indice = Math.floor((anguloFinal % (2 * Math.PI)) / angulo);
    return premios[cantidad - 1 - indice];
}

function girarRuleta() {
    if (girando || localStorage.getItem("jugadoHoy")) {
        mensaje.textContent = "Ya has jugado hoy. Intenta mañana.";
        return;
    }

    girando = true;
    let giro = (Math.random() * 3600) + 360;
    let anguloFinal = ((giro % 360) * Math.PI) / 180;
    let duracion = 3000;
    
    let inicio = performance.now();
    function animarGiro(tiempo) {
        let progreso = (tiempo - inicio) / duracion;
        if (progreso < 1) {
            anguloInicio = ((giro * progreso) % 360) * Math.PI / 180;
            dibujarRuleta();
            requestAnimationFrame(animarGiro);
        } else {
            anguloInicio = anguloFinal;
            dibujarRuleta();
            let resultado = obtenerResultado(anguloInicio);
            mensaje.textContent = `¡Has ganado: ${resultado}!`;
            localStorage.setItem("jugadoHoy", true);
            boton.disabled = true;
        }
    }
    requestAnimationFrame(animarGiro);
}

if (localStorage.getItem("jugadoHoy")) {
    boton.disabled = true;
    mensaje.textContent = "Ya has jugado hoy. Intenta mañana.";
}

boton.addEventListener("click", girarRuleta);
