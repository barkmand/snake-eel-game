
export function restart(){
    const menu = document.querySelector(".retry-menu")
    const retryBtn = document.querySelector(".retry-btn")
    retryBtn.addEventListener("click", () => {
        menu.classList.toggle("hidden")
    })
}