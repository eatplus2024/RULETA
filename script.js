body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-image: url("https://cdn.pixabay.com/photo/2016/03/28/09/54/fireworks-1285269_1280.jpg");
  background-size: cover;
  background-position: center;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: rgba(124, 174, 254, 0.7);
  border: 3mm solid gold;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  color: #333;
}

h1 {
  color: white;
  text-shadow: 2px 2px 4px black;
}

.roulette-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

#roulette {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 10px solid gold;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  position: relative;
  transform-origin: center;
  transition: transform 7s ease-out;
}

.needle {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 50px;
  background: red;
  border-radius: 5px;
  z-index: 10;
}

#spinButton {
  background-color: #333;
  color: white;
  border: 2px solid gold;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  margin-top: 20px;
}

#spinButton:active {
  background-color: green;
  color: black;
}

/* Animación de confeti */
.confetti {
  position: fixed;
  width: 10px;
  height: 10px;
  background-color: gold;
  opacity: 0.7;
  border-radius: 50%;
  animation: fall 2s linear infinite;
}

@keyframes fall {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
}

/* Mensaje de resultado */
#result {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid gold;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.result-lost {
  color: red;
}

.result-won {
  color: green;
}

@media screen and (max-width: 600px) {
  .container {
    margin: 20px;
    padding: 15px;
  }

  #roulette {
    width: 250px;
    height: 250px;
  }
}
