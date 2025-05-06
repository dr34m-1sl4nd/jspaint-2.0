// size of canvas shifts with window
const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth

const ctx = canvas.getContext("2d")

let drawHistory = [];
let undoHistory = [];

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

// clear button
let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", () => {
    // clears entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // resets the drawHistory
    drawHistory = [];
    undoHistory = [];
})

// draws each stroke from an array of strokes (which are an object of x, y, and colors)
function drawArray(array) {
    // resets the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // draws each stroke
    for (let i = 0; i < array.length; i++) {
        const stroke = array[i];
        // draws each path in stroke
        for (let j = 1; j < stroke.length; j++) {
            const drawPath = stroke[j];
            ctx.strokeStyle = drawPath.clr;
            ctx.beginPath();
            ctx.moveTo(stroke[j-1].currentX, stroke[j-1].currentY)
            ctx.lineTo(drawPath.currentX, drawPath.currentY)
            ctx.stroke()
        }
    }
}

// undoes the last stroke
function undo() {
    // if there is nothing on canvas, do nothing
    if (drawHistory.length <= 0) return;
    // moves the last stroke from drawHistory to undoHistory
    undoHistory.push(drawHistory.pop())
    // draws the newly modified drawHistory
    drawArray(drawHistory);
}

// redoes the last undo
function redo() {
    // if there is nothing in undoHistory, do nothing
    if (undoHistory.length === 0) return;
    // moves the last stroke from undoHistory to drawHistory
    drawHistory.push(undoHistory.pop())
    // draws the newly modified drawHistory
    drawArray(drawHistory);
}

// undoes the last stroke
let undoBtn = document.querySelector(".undo")
undoBtn.addEventListener("click", undo)

// redoes the last undo
let redoBtn = document.querySelector(".redo")
redoBtn.addEventListener("click", redo)

// key handler
document.addEventListener('keydown', function(event) {
    // ctrl + z -> undo()
    if (event.ctrlKey && (event.key === 'z' || event.key === 'Z')) {
        undo()
    } 
    // ctrl + y -> redo()
    else if (event.ctrlKey && (event.key === 'y' || event.key === 'Y')) {
        redo()
    } 
});

// only draw when mouse is pressed
canvas.addEventListener("mousedown", (e) => {
    draw = true;
    // adds the start of the stroke to drawHistory
    drawHistory.push([{currentX: e.clientX, currentY: e.clientY, clr: ctx.strokeStyle}])
    // resets the undoHistory, so redo does not add the previous undo
    undoHistory = [];
})

// stop drawing when mouse is released
canvas.addEventListener("mouseup", (e) => draw = false)

canvas.addEventListener("mousemove", (e) => {
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

    // adds current position to the active stroke
    drawHistory[drawHistory.length-1].push({currentX: e.clientX, currentY: e.clientY, clr: ctx.strokeStyle})

    // drawing line from prev. position
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    // update mouse position
    prevX = currentX
    prevY = currentY
})
