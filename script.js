const gridContainer = document.querySelector(".grid-container");
for (let i = 0; i < 256; i++) {
    const square = document.createElement("div");
    gridContainer.appendChild(square);
    square.addEventListener("mouseover", () => {
    square.style.backgroundColor = "black";
});

    gridContainer.appendChild(square);
}