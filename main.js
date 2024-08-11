const moves = document.getElementById("moves");
const time = document.getElementById("time");
const startButton = document.getElementById("start-game");
const stopButton = document.getElementById("stop-game");
const game = document.getElementById("game");
const result = document.getElementById("result");
const controls = document.querySelector(".controls");

let cards;
let interval;
let firstCard = false;
let secondCard = false;
let seconds = 0;
let minutes = 0;
let movesCount = 0;
let winCount = 0;

const items = [
  { name: "bmo", image: "./static/img/bmo.svg" },
  { name: "finn", image: "./static/img/finn.svg" },
  { name: "jake", image: "./static/img/jake.svg" },
  { name: "marceline", image: "./static/img/marceline.svg" },
  { name: "ice king", image: "./static/img/ice-king.svg" },
  { name: "hunter", image: "./static/img/hunter.svg" },
  { name: "princess bubblegum", image: "./static/img/princess-bubblegum.svg" },
  {
    name: "lumpy space princess",
    image: "./static/img/lumpy-space-princess.svg",
  },
];

const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  time.innerHTML = `<span>Time: ${minutesValue}:${secondsValue}</span>`;
};

const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves: ${movesCount}</span>`;
};

const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};
const matrixGenerator = (cardValues, size = 4) => {
  game.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    game.innerHTML += `
     <div class="card" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }

  game.style.gridTemplateColumns = `repeat(${size},auto)`;

  cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
              <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  time.innerHTML = `<span>Time: 00:00</span>`;
  moves.innerHTML = `<span>Moves: 0</span>`;
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  interval = setInterval(timeGenerator, 1000);
  moves.innerHTML = `<span>Moves: ${movesCount}</span>`;
  initializer();
});

stopButton.addEventListener(
  "click",
  (stopGame = () => {
    seconds = 0;
    minutes = 0;
    movesCount = 0;
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
