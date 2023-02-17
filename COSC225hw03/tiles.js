// Megan Huang 
// JavaScript tile drawing 


const numRows = 10;

function drawTiles() {
    const grid = document.querySelector(".grid");
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numRows; j++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            //calculate shade rgb
            //red=128, green decreases from 200 to 50 through the rows and columns, and blue=255
            const color = `rgb(90, ${200 - i * 20 - j * 10}, 200)`;
            tile.style.backgroundColor = color;
            grid.appendChild(tile);
        }
    }
}