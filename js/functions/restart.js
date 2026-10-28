export function restart(){
    const menu = document.querySelector(".retry-menu")
    const retryBtn = document.querySelector(".retry-btn")
    window.addEventListener("keydown", () => {
        if(event.key == "Escape"){
            menu.classList.toggle("hidden")
        }
    })
    retryBtn.addEventListener("click", () => {
        menu.classList.toggle("hidden")
    })
}