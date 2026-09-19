const gridSizeButton = document.querySelector(".grid-size-btn");
const gridContainer = document.querySelector(".grid-container");
const clearButton = document.querySelector(".clear-btn");
const blackButton = document.querySelector(".black-btn");
const rgbButton = document.querySelector(".rgb-btn");
const eraserButton = document.querySelector(".eraser-btn");

let isDrawing = false;
let colorMode = "rgb";

gridContainer.addEventListener("mousedown", () => {
    isDrawing = true;
});

document.addEventListener("mouseup", () => {
    isDrawing = false;
});

document.addEventListener("mouseleave", () => {
    isDrawing = false;
});

blackButton.addEventListener("click", () => {
    colorMode = "black";
});

rgbButton.addEventListener("click", () => {
    colorMode = "rgb";
});

eraserButton.addEventListener("click", () => {
    colorMode = "eraser";
});


// Creates a new grid based on the given size
function createGrid(size) {
    const totalSquares = size * size;

    gridContainer.innerHTML = "";

    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement("div");

        square.dataset.opacity = "0";

        square.addEventListener("mouseover", () => {
    if (!isDrawing) {
        return;
    }

    let color;
if (colorMode === "eraser") {
    square.style.backgroundColor = "";
    square.dataset.opacity = "0";
    return;
}

if (colorMode === "black") {
    color = "0, 0, 0";
} else {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    color = `${red}, ${green}, ${blue}`;
}

            let opacity = Number(square.dataset.opacity);

            opacity += 0.1;

            if (opacity > 1) {
                opacity = 1;
            }

            square.dataset.opacity = opacity;

            square.style.backgroundColor = `rgba(${color}, ${opacity})`;
        });

        gridContainer.appendChild(square);
    }
}
// Clears the color from every square in the grid
clearButton.addEventListener("click", () => {
    const squares = gridContainer.querySelectorAll("div");

    squares.forEach(square => {
        square.style.backgroundColor = "";
        square.dataset.opacity = "0";
    });
});


// Asks the user for a grid size and creates a new grid
gridSizeButton.addEventListener("click", () => {
    const size = Number(prompt("Enter grid size: "));

    if (Number.isInteger(size) && size > 0) {
        createGrid(size);
    }
});


// Creates the default 16 × 16 grid when the page loads
createGrid(16);