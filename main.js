const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth

const ctx = canvas.getContext("2d")

// previous mouse positions; will be null initially

// tracking mouse position
window.addEventListener("mousemove", (e) =>) {
    console.log("Mouse X: " + e.clientX)
    console.log("Mouse Y: " + e.clientY)
}