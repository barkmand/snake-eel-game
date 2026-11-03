export function eel(){
    const grid = document.querySelector(".levelarea")
    const tiles = document.querySelectorAll(".tile")
    
    const columns = 13
    const rows = 11
    
    let position = 69
    
    //#region HIGH SCORE COUNT START
    
    let highScoreCount
    const highScoreCounter = document.querySelector(".high-score-counter")
    if(JSON.parse(localStorage.getItem("HighScore"))){
        highScoreCount = JSON.parse(localStorage.getItem("HighScore"))
        highScoreCounter.innerHTML = highScoreCount
    }else{
        highScoreCount = 0
    }
//#endregion HIGH SCORE COUNT END

    // #region CREATING THE EELHEAD, GIVING IT EYES, AND SETTING IT AT THE STARTING POSITION
    const eelHead = document.createElement("div")
    eelHead.classList.add("eelsquare", "eelhead")
    eelHead.classList.remove("up")
    eelHead.classList.remove("down")
    eelHead.classList.remove("left")
    eelHead.classList.add("right")
    eelHead.innerHTML = `
    <div class="eeleye"><div class="eyeglint"></div><div class="eyeglint2"></div></div>
    <div class="eeleye"><div class="eyeglint"></div><div class="eyeglint2"></div></div>
    <div class="deadeye deadeye2"></div>
    <div class="deadeye"></div>
    `
    tiles[position].appendChild(eelHead)
    // #endregion
    
    let newPosition
    let direction
    const retryMenu = document.querySelector(".retry-menu")

    // #region SETTING direction ON EVERY WASD/ARROWKEY KEYPRESS
    document.addEventListener("keydown", (keypress) => {
        if(keypress.key.startsWith("Arrow")){
            keypress.preventDefault()
        }
        if(!retryMenu.classList.contains("hidden")){
            return
        }
        newPosition = position
        switch (keypress.key.toLowerCase()){
            case "w":
            case "arrowup":
                direction = 1
                break
            
            case "s":
            case "arrowdown":
                direction = 3
                break
            
            case "a":
            case "arrowleft":
                direction = 2
                break

            case "d":
            case "arrowright":
                direction = 4
                break

        }
        // NOTE TO SELF: SWITCH/CASE IS JUST CHECKING AN if STATEMENT AGAINST EACH CASE, AKA THIS THING CHECKS if(event.key.toLowerCase() == "w" || "arrowup"){direction = 1} AND THEN DOES THAT FOR EACH case, SO THIS IS JUST A CLEANER WAY OF WRITING THAT. else CAN BE WRITTEN AS default:
    })
    // #endregion

    // #region MOVING THE EELHEAD ACCORDING TO direction AT AN INTERVAL
    
    function moveEelHead(){
        if(!retryMenu.classList.contains("hidden") || newPosition == null){
            return
        }
        if(direction == 1){
            newPosition -= columns
            eelHead.classList.add("up")
            eelHead.classList.remove("down")
            eelHead.classList.remove("left")
            eelHead.classList.remove("right")
        }
        if(direction == 3){
            newPosition += columns
            eelHead.classList.remove("up")
            eelHead.classList.add("down")
            eelHead.classList.remove("left")
            eelHead.classList.remove("right")
        }
        if(direction == 2){
            newPosition--
            eelHead.classList.remove("up")
            eelHead.classList.remove("down")
            eelHead.classList.add("left")
            eelHead.classList.remove("right")
        }
        if(direction == 4){
            newPosition++
            eelHead.classList.remove("up")
            eelHead.classList.remove("down")
            eelHead.classList.remove("left")
            eelHead.classList.add("right")
        }
        
        if(
            (newPosition < 0 || newPosition >= tiles.length) ||
            (
                ((position % columns == 0) && direction == 2) ||
                ((position % columns == 12) && direction == 4)
            )
        ){
            onDeathEvents()
        }else{
            tiles[newPosition].appendChild(eelHead)
            position = newPosition
        }
    }

    setInterval(moveEelHead, 300)

    // #endregion
    
// FISH BEGINS HERE //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//#region TEMPORARY REGION
    const fish = document.createElement("i")
    fish.classList.add("fa-fish")
    fish.classList.add("fa-solid")
    fish.setAttribute("id", "fish")
    const scoreCounter = document.querySelectorAll(".score-counter")
    let scoreCount = 0
    
    let fishPosition
    let availableTiles
    let randomIndex
    
    function moveFishRandomly(){
        availableTiles = [...tiles].filter((tile) => {
            return! tile.querySelector(".eelsquare")
        })
        randomIndex = Math.floor(Math.random() * availableTiles.length)
        fishPosition = availableTiles[randomIndex]
        fishPosition.appendChild(fish)
        
    }
        
        moveFishRandomly()
        
        const muteBtn = document.querySelector(".mute-icon")
        function checkFish(){
            if(fishPosition.querySelector(".eelhead")){
                if(muteBtn.classList.contains("fa-volume")){
                    new Audio('../../assets/eating-sound.mp3').play()
                }
                moveFishRandomly()
                scoreCount++
                scoreCounter.forEach((counter) => {
                    counter.innerHTML = scoreCount
                })
            }
        }
        
        setInterval(checkFish, 300)
        
        // RESETTING SCORE COUNT ON RESTART
        const retryBtn = document.querySelector(".retry-btn")
        retryBtn.addEventListener("click", () => {
            scoreCounter.forEach((counter) => {
                scoreCount = 0
                counter.innerHTML = scoreCount
            })
            tiles[position].appendChild(eelHead)
            fish.classList.remove("hidden")
            direction = 4
            eelHead.classList.remove("up")
            eelHead.classList.remove("down")
            eelHead.classList.remove("left")
            eelHead.classList.add("right")
            eelHead.classList.remove("dead")
        })
//#endregion TEMPORARY REGION


        function onDeathEvents(){
            if(muteBtn.classList.contains("fa-volume")){
                new Audio('../../assets/new-death-sound.mp3').play()
            }
            if (JSON.parse(localStorage.getItem("HighScore")) < scoreCount){
                highScoreCount = scoreCount
                highScoreCounter.innerHTML = highScoreCount
                console.log("NEW RECORD, CONGRATULATIONS")
                localStorage.setItem("HighScore", JSON.stringify(highScoreCount))
            }
            position = 69
            newPosition = 69
            retryMenu.classList.toggle("hidden")
            fish.classList.add("hidden")
            eelHead.classList.add("dead")
            moveFishRandomly()
    }
}
