const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const winnersList = document.getElementById("winnersList");

const prizes = [
    { text: "20,000", value: 20000 },
    { text: "10,000", value: 10000 },
    { text: "5,000", value: 5000 },
    { text: "2,000", value: 2000 },
    { text: "1,000", value: 1000 },
    { text: "Vuelve mañana", value: 0 }
];

let angle = 0;
let spinning = false;

function drawWheel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;
    const numSegments = prizes.length;
    const anglePerSegment = (2 * Math.PI) / numSegments;

    for (let i = 0; i < numSegments; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, anglePerSegment * i, anglePerSegment * (i + 1));
        ctx.fillStyle = i % 2 === 0 ? "#ffcc00" : "#ff5733";
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(anglePerSegment * i + anglePerSegment / 2);
        ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.fillText(prizes[i].text, radius * 0.7, 10);
        ctx.restore();
    }
}

function spinWheel() {
    if (spinning) return;
    spinning = true;

    let spins = Math.floor(Math.random() * 10) + 5;
    let finalAngle = angle + spins * 360 + Math.random() * 360;
    
    let animationFrame;
    let currentAngle = angle;
    let speed = 20;

    function animate() {
        if (speed > 0.1) {
            currentAngle += speed;
            speed *= 0.97;
            angle = currentAngle % 360;
            drawWheel();
            animationFrame = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationFrame);
            determinePrize();
            spinning = false;
        }
    }

    animate();
}

function determinePrize() {
    const numSegments = prizes.length;
    const anglePerSegment = 360 / numSegments;
    const normalizedAngle = (360 - (angle % 360)) % 360;
    const index = Math.floor(normalizedAngle / anglePerSegment);
    const prize = prizes[index];

    if (prize.value > 0) {
        alert(`¡Felicidades! Has ganado ${prize.text} pesos`);
        addWinner(prize.text);
    } else {
        alert("Hoy no ganaste, pero mañana tendrás una nueva oportunidad. ¡Te esperamos mañana!");
    }
}

function addWinner(amount) {
    const li = document.createElement("li");
    li.textContent = `Ganaste: ${amount} pesos`;
    winnersList.appendChild(li);
}

spinButton.addEventListener("click", spinWheel);
drawWheel();
