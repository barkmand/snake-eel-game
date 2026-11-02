export function eel(){
    const grid = document.querySelector(".levelarea")
    const tiles = document.querySelectorAll(".tile")

    const columns = 13
    const rows = 11
    
    let position = 69

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
            console.log("game over")
            position = 69
            newPosition = 69
            direction = 4
            eelHead.classList.remove("up")
            eelHead.classList.remove("down")
            eelHead.classList.remove("left")
            eelHead.classList.add("right")
            tiles[position].appendChild(eelHead)
            retryMenu.classList.toggle("hidden")
        }else{
            tiles[newPosition].appendChild(eelHead)
            position = newPosition
        }
    }

    setInterval(moveEelHead, 500)

    // #endregion
    
}
