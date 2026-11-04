export function eel() {
    const grid = document.querySelector(".levelarea");
    const tiles = document.querySelectorAll(".tile");
    
    const columns = 13;
    const rows = 11;
    
    let position = 69;
    
    const fish = document.createElement("i");
    fish.classList.add("fa-fish");
    fish.classList.add("fa-solid");
    fish.setAttribute("id", "fish");
    const scoreCounter = document.querySelectorAll(".score-counter");
    let scoreCount = 0;
    
    let fishPosition;
    let availableTiles;
    let randomIndex;
    
    const muteBtn = document.querySelector(".mute-icon");
  //#region HIGH SCORE COUNT START

  let highScoreCount;
  const highScoreCounter = document.querySelector(".high-score-counter");
  if (JSON.parse(localStorage.getItem("HighScore"))) {
    highScoreCount = JSON.parse(localStorage.getItem("HighScore"));
    highScoreCounter.innerHTML = highScoreCount;
  } else {
    highScoreCount = 0;
  }
  //#endregion HIGH SCORE COUNT END

  // #region CREATING THE EELHEAD, GIVING IT EYES, AND SETTING IT AT THE STARTING POSITION
  const eelHead = document.createElement("div");
  eelHead.classList.add("eelsquare", "eelhead");
  eelHead.classList.remove("up");
  eelHead.classList.remove("down");
  eelHead.classList.remove("left");
  eelHead.classList.add("right");
  eelHead.innerHTML = `
    <div class="eeleye"><div class="eyeglint"></div><div class="eyeglint2"></div></div>
    <div class="eeleye"><div class="eyeglint"></div><div class="eyeglint2"></div></div>
    <div class="deadeye deadeye2"></div>
    <div class="deadeye"></div>
    `;
  tiles[position].appendChild(eelHead);
  // #endregion

  let newPosition;
  let direction;
  const retryMenu = document.querySelector(".retry-menu");

  let eelBody = [position, 68, 67];
  const eelbody = `<div class="eelsquare eelbody"><div/>`;

  // #region SETTING direction ON EVERY WASD/ARROWKEY KEYPRESS
  
  let previousDirection

  document.addEventListener("keydown", (keypress) => {
    if (keypress.key.startsWith("Arrow")) {
      keypress.preventDefault();
    }
    if (!retryMenu.classList.contains("hidden")) {
      return;
    }
    newPosition = position;
    switch (keypress.key.toLowerCase()) {
      case "w":
      case "arrowup":
        if(previousDirection != 3){
            direction = 1;
        }
        break;

      case "s":
      case "arrowdown":
        if(previousDirection != 1){
            direction = 3;
        }
        break;

      case "a":
      case "arrowleft":
        if(previousDirection != 4){
            direction = 2;
        }
        break;

      case "d":
      case "arrowright":
        if(previousDirection != 2){
            direction = 4;
        }
        break;
    }
});
  
  // #endregion

  // #region EXPERIMENTING WITH eelBody

  let existingBodySpaces;
  let hasEaten = false;

  function updateEelBody() {
    let eelbodySquares = document.querySelectorAll(".eelbody");
    eelBody.forEach((position) => {
      if (!tiles[position].querySelector(".eelhead")) {
        tiles[position].innerHTML = eelbody;
      }
    });


    // (pre-timers-sync-fix) PENDING FIX: CURRENTLY, onDeathEvents PLAYS WHEN THE HEAD TOUCHES A SQUARE THAT WAS OCCUPIED BY A BODY PART IN THE PREVIOUS GAME TICK /////////////////////////////////////////////////////////////////////////////////
    // #region GAME OVER IF HEAD TOUCHES BODY
    existingBodySpaces = [...tiles].filter((tile) => {
      return tile.querySelector(".eelbody");
    });
    existingBodySpaces.forEach((tile) => {
      if (tile.querySelector(".eelhead")) {
        onDeathEvents();
      }
    });
    if (!hasEaten) {
      eelbodySquares.forEach((square) => {
        square.remove();
      });
    }
    // #endregion GAME OVER IF HEAD TOUCHES BODY
  }
  updateEelBody();

  // #endregion EXPERIMENTING WITH eelBody

  // #region MOVING THE EELHEAD ACCORDING TO direction AT AN INTERVAL

  function moveEelHead() {
    if (!retryMenu.classList.contains("hidden") || newPosition == null) {
      return;
    }
    if (direction == 1) {
      newPosition -= columns;
      eelHead.classList.add("up");
      eelHead.classList.remove("down");
      eelHead.classList.remove("left");
      eelHead.classList.remove("right");
    }
    if (direction == 3) {
      newPosition += columns;
      eelHead.classList.remove("up");
      eelHead.classList.add("down");
      eelHead.classList.remove("left");
      eelHead.classList.remove("right");
    }
    if (direction == 2) {
      newPosition--;
      eelHead.classList.remove("up");
      eelHead.classList.remove("down");
      eelHead.classList.add("left");
      eelHead.classList.remove("right");
    }
    if (direction == 4) {
      newPosition++;
      eelHead.classList.remove("up");
      eelHead.classList.remove("down");
      eelHead.classList.remove("left");
      eelHead.classList.add("right");
    }
    previousDirection = direction
    
    if (
        newPosition < 0 ||
        newPosition >= tiles.length ||
        (position % columns == 0 && direction == 2) ||
        (position % columns == 12 && direction == 4)
    ) {
        onDeathEvents();
    } else {
        
      // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHH
      tiles[newPosition].appendChild(eelHead);
      position = newPosition;
      eelBody.unshift(newPosition);
      if (fishPosition.querySelector(".eelhead")) {
            hasEaten = true;
            if (muteBtn.classList.contains("fa-volume")) {
              new Audio("../../assets/eating-sound.mp3").play();
            }
            moveFishRandomly();
            scoreCount++;
            scoreCounter.forEach((counter) => {
              counter.innerHTML = scoreCount;
            });
          }
      if (!hasEaten) {
        eelBody.pop();
        updateEelBody();
      } else {
        hasEaten = false;
        updateEelBody();
      }
    }
  }

  // #endregion

  // FISH BEGINS HERE //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //#region TEMPORARY REGION

  function moveFishRandomly() {
    availableTiles = [...tiles].filter((tile) => {
      return !tile.querySelector(".eelsquare");
    });
    randomIndex = Math.floor(Math.random() * availableTiles.length);
    fishPosition = availableTiles[randomIndex];
    fishPosition.appendChild(fish);
  }

  moveFishRandomly();


  function checkFish() {
    if (fishPosition.querySelector(".eelhead")) {
      hasEaten = true;
      if (muteBtn.classList.contains("fa-volume")) {
        new Audio("../../assets/eating-sound.mp3").play();
      }
      moveFishRandomly();
      scoreCount++;
      scoreCounter.forEach((counter) => {
        counter.innerHTML = scoreCount;
      });
    }
  }

  setInterval(moveEelHead, 300);
//   setInterval(checkFish, 300);

  // RESETTING SCORE COUNT ON RESTART
  const retryBtn = document.querySelector(".retry-btn");
  retryBtn.addEventListener("click", () => {
    scoreCounter.forEach((counter) => {
      scoreCount = 0;
      counter.innerHTML = scoreCount;
    });
    tiles[position].appendChild(eelHead);
    fish.classList.remove("hidden");
    direction = 4;
    eelHead.classList.remove("up");
    eelHead.classList.remove("down");
    eelHead.classList.remove("left");
    eelHead.classList.add("right");
    eelHead.classList.remove("dead");
    let eelbodySquares = document.querySelectorAll(".eelbody");
    eelbodySquares.forEach((square) => {
      square.remove();
    });
    updateEelBody();
  });
  //#endregion TEMPORARY REGION

  function onDeathEvents() {
    if (muteBtn.classList.contains("fa-volume")) {
      new Audio("../../assets/new-death-sound.mp3").play();
    }
    if (JSON.parse(localStorage.getItem("HighScore")) < scoreCount) {
      highScoreCount = scoreCount;
      highScoreCounter.innerHTML = highScoreCount;
      console.log("NEW RECORD, CONGRATULATIONS");
      localStorage.setItem("HighScore", JSON.stringify(highScoreCount));
    }
    position = 69;
    newPosition = 69;
    eelBody = [position, 68, 67];
    retryMenu.classList.toggle("hidden");
    fish.classList.add("hidden");
    eelHead.classList.add("dead");
    moveFishRandomly();
  }
}

