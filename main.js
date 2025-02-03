// size of canvas shifts with window
const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth

const ctx = canvas.getContext("2d")

// previous mouse positions
// They will be null initially
let prevX = null
let prevY = null

// How thick the lines should be
ctx.lineWidth = 5

let draw = false

// selects everything with the .clr class
let clrs = document.querySelectorAll(".clr")

// converts Nodelist (node = html element) to Array (stores multiple items under one variable name)
clrs = Array.from(clrs)

clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr
    })
})

// clear button vvv
let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", () => {
    // clears entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

// only draw when mouse is pressed
window.addEventListener("mousedown", (e) => draw = true)

// stop drawing when mouse is released
window.addEventListener("mouseup", (e) => draw = false)

window.addEventListener("mousemove", (e) => {
    // initially previous mouse positions are null
    // so you can't draw a line
    if(prevX == null || prevY == null || !draw){
        // Set the previous mouse positions to the current mouse positions
        prevX = e.clientX
        prevY = e.clientY
        return
    } 

    // Current mouse position
    let currentX = e.clientX
    let currentY = e.clientY

    // drawing line from prev. position
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    // update mouse position
    prevX = currentX
    prevY = currentY
})
