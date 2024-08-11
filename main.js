const moves = document.getElementById("moves");
const time = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const game = document.getElementById("game");
const result = documnet.getElementById("result");
const controls = document.querySelector(".controls");

let cards;
let interval;
let firstCard = false;
let secondCard = false;

