export function mute(){
    const muteBtn = document.querySelector(".mute-btn")
    const muteIcon = document.querySelector(".mute-icon")
    let muted = 1
    muteBtn.addEventListener("click", () => {
        muteIcon.classList.toggle("fa-volume-xmark")
        muteIcon.classList.toggle("fa-volume")
        if(muted == 1){
            muted--
        }else{
            muted = 1
        }
        /* INSERT CODE THAT ACTUALLY MUTES SOUND EFFECTS */
    })
}