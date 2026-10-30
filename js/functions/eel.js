export function eel(){
    const grid = document.querySelector(".levelarea")
    const tiles = document.querySelectorAll(".tile")

    const columns = 13
    const rows = 11
    
    let position = 69

    // CREATING THE EEL HEAD, GIVING IT EYES, AND SETTING IT AT THE STARTING POSITION
    const head = document.createElement("div")
    head.classList.add("eelsquare", "eelhead")
// FIND OUT WHAT appendChild MEANS
    tiles[position].appendChild(head)
    head.innerHTML = `
        <div class="eeleye"><div class="eyeglint"></div><div class="eyeglint2"></div></div>
        <div class="eeleye"><div class="eyeglint"></div><div class="eyeglint2"></div></div>
    `

    
    let newPosition
    
    document.addEventListener("keydown", (event) => {
        if(event.key.startsWith("Arrow")){
            event.preventDefault()
        }
        newPosition = position
        // FIND OUT WHAT SWITCH AND CASE AND BREAK AND TOLOWERCASE MEANS AND WHY WE WRITE event INSTEAD OF LEAVING IT OUT
        // SETTING newPosition ON EVERY WASD KEYPRESS
        switch (event.key.toLowerCase()){
            case "w":
            case "arrowup":
                newPosition -= columns
                break
            
            case "s":
            case "arrowdown":
                newPosition += columns
                break
            
            case "a":
            case "arrowleft":
                newPosition--
                break

            case "d":
            case "arrowright":
                newPosition++
                break

            default:
                return
        }

        // STOPPING EELHEAD FROM MOVING OUTSIDE THE GRID
        if(
            (newPosition < 0 || newPosition >= tiles.length) ||
            (
                (["a", "arrowleft"].includes(event.key.toLowerCase()) && position % columns == 0) ||
                (["d", "arrowright"].includes(event.key.toLowerCase())&& position % columns == 12)
            )
        ){
            console.log("game over")
        }else{
        // MOVING THE EELHEAD
            tiles[newPosition].appendChild(head)
            position = newPosition
        }
    })


}
