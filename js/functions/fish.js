
export function fish(){
    const tiles = document.querySelectorAll(".tile")
    const fish = document.createElement("i")
    fish.classList.add("fa-fish")
    fish.classList.add("fa-solid")
    fish.setAttribute("id", "fish")
    const scoreCounter = document.querySelectorAll(".score-counter")
    let scoreCount = 0
    const highScoreCounter = document.querySelector(".high-score-counter")
    let highScoreCount = 0
    
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

    function checkFish(){
        if(fishPosition.querySelector(".eelhead")){
            console.log("yummers")
            moveFishRandomly()
            scoreCount++
            scoreCounter.forEach((counter) => {
                counter.innerHTML = 
                scoreCount
            })
        }
    }

    setInterval(checkFish, 500)



    // RESETTING SCORE ON GAME OVER AND UPDATING HIGH SCORE
    // UNFINISHED
    const retryBtn = document.querySelector(".retry-btn")
        retryBtn.addEventListener("click", () => {
            moveFishRandomly()
            if (highScoreCount < scoreCount){
                highScoreCount = scoreCount
                highScoreCounter.innerHTML = highScoreCount
                console.log("CONFETTI")
            }
            scoreCount = 0
            scoreCounter.forEach((counter) => {
                counter.innerHTML = scoreCount
            })
        })
    
}