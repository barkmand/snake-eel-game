export function gridTiles(){
    const grid = document.querySelector(".levelarea")
    for (let step = 0; step < 71; step++){

        grid.insertAdjacentHTML(
        "beforeend",
        `
        <div class="tile tile1"></div>
        <div class="tile tile2"></div>
        `
        )
    }
    grid.insertAdjacentHTML(
        "beforeend",
        `
        <div class="tile tile1"></div>
        `
        )
    
}