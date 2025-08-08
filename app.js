const readyBtn = document.querySelector(".ready-btn");
const gameBox = document.querySelector(".game-box");
const btnsBox = document.querySelector(".btns-box");
const infoBox = document.querySelector(".info-box");
const dancerMoveElement = document.getElementById("dancer-move");
const playerElement = document.getElementById("player");
const playerChoise = document.querySelectorAll("[data-move]");
const winnerTitle = document.getElementById("winner-title");
const winnerSubtitle = document.getElementById("winner-subtitle");
const winnerImg = document.getElementById("winner-img");
const winnerBox = document.querySelector(".winner-box");
const playAgain = document.getElementById("play-again");

const danceMoves = [
  { move: "up", img: "assets/dancer-up-1" },
  { move: "up", img: "assets/dancer-up-2" },
  { move: "up", img: "assets/dancer-up-3" },
  { move: "up", img: "assets/dancer-up-4" },
  { move: "down", img: "assets/dancer-down-1" },
  { move: "down", img: "assets/dancer-down-2" },
  { move: "down", img: "assets/dancer-down-3" },
  { move: "left", img: "assets/dancer-left-1" },
  { move: "left", img: "assets/dancer-left-2" },
  { move: "right", img: "assets/dancer-right-1" },
  { move: "right", img: "assets/dancer-right-2" },
  { move: "right", img: "assets/dancer-right-3" },
  { move: "right", img: "assets/dancer-right-4" },
];

let currentSequence = [];
let moveIndex = 0;
let playerMoves = [];
let playerIndex = 0;

readyBtn.addEventListener("click", handleReadyBtn);

playAgain.addEventListener("click", () => {
  winnerBox.classList.remove("show");

  playerMoves = [];
  playerIndex = 0;
  currentSequence = [];

  handleReadyBtn();
});

function handleReadyBtn() {
  playerElement.src = "assets/player-start.svg";
  btnsBox.style.display = "none";
  infoBox.style.display = "none";
  startCountdown(3, startGame);
}

playerChoise.forEach((choise) => {
  choise.addEventListener("click", () => {
    const move = choise.dataset.move;
    playerMoves.push(move);

    const correctMove = currentSequence[playerIndex].move;

    if (move === correctMove) {
      console.log("correct");
    } else {
      console.log("wrong");
    }

    playerIndex++;
    const moveImages = {
      up: "assets/player-up.svg",
      down: "assets/player-down.svg",
      left: "assets/player-left.svg",
      right: "assets/player-right.svg",
    };

    playerElement.src = moveImages[move];

    if (playerIndex === currentSequence.length) {
      checkFinalResult();
    }
  });
});

function checkFinalResult() {
  const win = playerMoves.every((move, i) => move === currentSequence[i].move);

  if (win) {
    winnerTitle.innerText = "You Win!";
    winnerSubtitle.innerText = "Great job!";
    winnerImg.src = "assets/player-win.svg";
  } else {
    winnerTitle.innerText = "You Lose!";
    winnerSubtitle.innerText = "Try again!";
    winnerImg.src = "assets/player-loses.svg";
  }
  playerMoves = [];
  playerIndex = 0;

  winnerBox.classList.add("show");
}

function startCountdown(duration, onFinish) {
  let timer = duration;

  const interval = setInterval(() => {
    const timerElement = document.getElementById("timer");

    if (timer > 0) {
      timerElement.textContent = `Game starts in ${timer}...`;
    } else {
      clearInterval(interval);
      timerElement.textContent = "";
      onFinish();
    }

    timer--;
  }, 1000);
}

function getRandomDance() {
  const randomIndex = Math.floor(Math.random() * danceMoves.length);
  return danceMoves[randomIndex];
}

function startGame() {
  console.log("Game Started!");
  currentSequence = [];
  moveIndex = 0;
  showDanceSequence(4);

  const sound = document.getElementById("dance-sound");
  sound.currentTime = 0; 
  sound.play();
}

function showDanceSequence(length) {
  const interval = setInterval(() => {
    if (moveIndex >= length) {
      clearInterval(interval);
      dancerMoveElement.src = "assets/dancer-start.svg";
      gameBox.classList.add("game-box", "show");
      btnsBox.classList.add("show");
      btnsBox.style.display = "block";
      return;
    }

    const randomDance = getRandomDance();
    currentSequence.push(randomDance);
    dancerMoveElement.src = `${randomDance.img}.svg`;

    moveIndex++;
  }, 900);
}
