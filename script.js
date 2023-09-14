const playerScores = {
  player_1: 0,
  player_2: 0,
};
let currPlayer = 1;

const startButton = document.querySelector(".start-btn");
const playerMove = document.getElementById("player-move");
const roll = document.getElementById("roll");
const gameControl = document.getElementById("controls");
const score = document.getElementById("score");

const rollButton = document.createElement("button");

startButton.addEventListener("click", () => {
  gameControl.innerHTML = "<h2>The game has started</h2>";
  gameControl.innerHTML +=
    "<button id='quit' class='start-btn'>Wanna quit?</button>";
  const quitButton = document.getElementById("quit");
  quitButton.addEventListener("click", () => {
    location.reload();
  });
  playerMove.innerHTML = "Roll the dice for player 1";
  rollButton.innerHTML = "Roll the dice";
  rollButton.className = "start-btn";
  roll.appendChild(rollButton);
  score.innerHTML = `The score is currently player 1: ${playerScores.player_1} and player 2: ${playerScores.player_2}`;
});

rollButton.addEventListener("click", () => {
  roll.innerHTML =
    '<button id="roll-again" class="start-btn">Roll again</button>';
  roll.innerHTML += '<button id="pass" class="start-btn">Pass</button>';
  rollDice();
  const rollAgain = document.getElementById("roll-again");
  rollAgain.addEventListener("click", () => {
    rollDice();
  });
  const passButton = document.getElementById("pass");
  passButton.addEventListener("click", () => {
    if (currPlayer == 1) {
      currPlayer = 2;
      playerMove.innerHTML = "You passed. It's player 2's turn now";
      setTimeout(() => {
        playerMove.innerHTML = "Roll the dice for player 2";
      }, 2000);
    } else {
      currPlayer = 1;
      playerMove.innerHTML = "You passed. It's player 1's turn now";
      setTimeout(() => {
        playerMove.innerHTML = "Roll the dice for player 1";
      }, 2000);
    }
  });
});

const imgDiv = document.createElement("div");
imgDiv.style.cssText = "display: flex; flex-direction: column;";
const firstRoll = document.createElement("img");
firstRoll.style.cssText = "width: 50px; height: 50px";
const secondRoll = document.createElement("img");
secondRoll.style.cssText = "width: 50px; height: 50px";

const diceOptions = [
  "./assets/side1.jpg",
  "./assets/side2.png",
  "./assets/side3.png",
  "./assets/side4.png",
  "./assets/side5.png",
  "./assets/side6.jpeg",
];

function rollDice() {
  const randomNumber1 = Math.floor(Math.random() * 6);
  const randomNumber2 = Math.floor(Math.random() * 6);
  let sumOfDices = (randomNumber1 + 1) + (randomNumber2 + 1);
  if (randomNumber1 == 0 && randomNumber2 == 0 && currPlayer == 1) {
    playerScores.player_1 = 0;
    playerMove.innerHTML = "Oops! Snake eyes! It's now player 2's turn";
    setTimeout(() => {
        playerMove.innerHTML = "Roll the dice for player 2";
        currPlayer = 2;
      }, 2000);
  } else if (randomNumber1 == 0 && randomNumber2 == 0 && currPlayer == 2) {
    playerScores.player_2 = 0;
    setTimeout(() => {
        playerMove.innerHTML = "Roll the dice for player 1";
        currPlayer = 1;
      }, 2000);
      playerMove.innerHTML = "Oops! Snake eyes! It's now player 1's turn";
  } else if ((randomNumber1 == 0 || randomNumber2 == 0) && currPlayer == 1) {
    setTimeout(() => {
      playerMove.innerHTML = "Roll the dice for player 2";
      currPlayer = 2;
    }, 2000);
    playerMove.innerHTML = "Player 1 rolled a 1 so it's Player 2's turn";
  } else if ((randomNumber1 == 0 || randomNumber2 == 0) && currPlayer == 2) {
    setTimeout(() => {
      playerMove.innerHTML = "Roll the dice for player 1";
    }, 2000);
    currPlayer = 1;
    playerMove.innerHTML = "Player 2 rolled a 1 so it's Player 1's turn";
  }


  if (currPlayer == 1 && randomNumber1 != 0 && randomNumber2 != 0) {
    playerScores.player_1 += sumOfDices;
    if (playerScores.player_1 >= 30) {
      newGame();
    }
  } else if (currPlayer == 2 && randomNumber1 != 0 && randomNumber2 != 0) {
    playerScores.player_2 += sumOfDices;
    if (playerScores.player_2 >= 30) {
      newGame();
    }
  }
  score.innerHTML = `The score is currently player 1: ${playerScores.player_1} and player 2: ${playerScores.player_2}`;


  firstRoll.src = diceOptions[randomNumber1];
  secondRoll.src = diceOptions[randomNumber2];
  imgDiv.appendChild(firstRoll);
  imgDiv.appendChild(secondRoll);
  imgDiv.style.cssText =
    "display: flex; justify-content: center; align-items: center; margin-top: 20px; gap: 10px;";
  roll.appendChild(imgDiv);
}
function newGame() {
  roll.remove();
  playerMove.remove();
  gameControl.innerHTML = "<h2>Game has ended</h2>";

    if(currPlayer == 1){
        score.innerHTML = `<h2>Player 1 wins with ${playerScores.player_1} points!</h2>`;
      score.style.cssText = "font-size:60px;";
    }else{
        score.innerHTML = `<h2>Player 2 wins with ${playerScores.player_2} points!</h2>`;
      score.style.cssText = "font-size:60px; height: 80px;";
    }
    gameControl.style.cssText = 'height: 300px';
    gameControl.innerHTML += score.innerHTML;
    score.remove();
      const startNew =  document.createElement('button')
      startNew.innerHTML = 'Start a new game?'; 
      startNew.className = 'start-btn'   
      gameControl.append(startNew)
  startNew.addEventListener("click", () => {
    location.reload();
  });
}
