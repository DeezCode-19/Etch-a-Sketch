const gridSizeButton = document.querySelector(".grid-size-btn");
const gridContainer = document.querySelector(".grid-container");
const clearButton = document.querySelector(".clear-btn");

let isDrawing = false;

document.addEventListener("mousedown", () => {
    isDrawing = true;
});

document.addEventListener("mouseup", () => {
    isDrawing = false;
});


// Creates a new grid based on the given size
function createGrid(size) {
    const totalSquares = size * size;

    gridContainer.innerHTML = "";

    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement("div");

        square.addEventListener("mouseover", () => {
            if (isDrawing) {
                square.style.backgroundColor = "black";
            }
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


// Asks the user for a grid size and creates a new grid
gridSizeButton.addEventListener("click", () => {
    const size = Number(prompt("Enter grid size: "));

    createGrid(size);
});


// Creates the default 16 × 16 grid when the page loads
createGrid(16);