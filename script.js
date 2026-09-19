const gridSizeSlider = document.querySelector("#grid-size");
const gridSizeValue = document.querySelector("#grid-size-value");
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

        square.addEventListener("mouseenter", (event) => {
            if (!isDrawing || event.buttons !== 1) {
                return;
            }

            let color;

            if (colorMode === "eraser") {
                square.style.backgroundColor = "";
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

            square.style.backgroundColor = `rgb(${color})`;
        });

        gridContainer.appendChild(square);
    }
}


// Clears the color from every square in the grid
clearButton.addEventListener("click", () => {
    const squares = gridContainer.querySelectorAll("div");

    squares.forEach(square => {
        square.style.backgroundColor = "";
    });
});


// Changes the grid size using the slider
gridSizeSlider.addEventListener("input", () => {
    const size = Number(gridSizeSlider.value);

    gridSizeValue.textContent = `${size} × ${size}`;

    createGrid(size);
});


// Creates the default 16 × 16 grid when the page loads
createGrid(16);