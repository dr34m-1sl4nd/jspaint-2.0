const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth

const ctx = canvas.getContext("2d")

// previous mouse positions; will be null initially

let prevX = null
let prevY = null

// line thickness
ctx.lineWidth = 5

// tracking mouse position
window.addEventListener("mousemove", (e) =>) {
    // can't draw line bc position starts as null
    if(prevX == null || prevY == null){
        //set previous mouse position to current
        prevX = e.clientX
        prevY = e.clientY
        return
    }
}