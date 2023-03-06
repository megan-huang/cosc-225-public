//megan huang 
//javascript: interactive drawing

const ns = "http://www.w3.org/2000/svg";

//creating all button attributes
const canvas = document.querySelector("#canvas");

const colors = [
    { name: "mammoth-purple-night", value: "rgb(49, 26, 77)"},
    { name: "mammoth-purple", value: "rgb(63, 31, 105)" },
    { name: "mammoth-purple-dusk", value: "rgb(93, 60, 133)" },
    { name: "mammoth-purple-pale", value: "rgb(183, 165, 211)" },
    { name: "robert-frost", value: "rgb(80, 80, 97)" },
    { name: "tusk", value: "rgb(226, 225, 219)" },
    { name: "ice-age", value: "rgb( 0, 184, 213)" },
    { name: "spring-leaf", value: "rgb(91, 161, 81)" },
    { name: "autumn-leaf", value: "rgb(223, 114, 61)" },
  ];
  
  const shapes = [
    { name: "line" },
    { name: "circle" },
  ];
  
  const colorButtonsContainer = document.querySelector("#colors");
  const shapeButtonsContainer = document.querySelector("#shapes");
  
  //color buttons
  colors.forEach((color) => {
    const button = document.createElement("button");
    button.classList.add("color");
    button.setAttribute("select-color", color.name);
    button.style.backgroundColor = color.value;
    colorButtonsContainer.appendChild(button);
  });
  
  //shape buttons
  shapes.forEach((shape) => {
    const button = document.createElement("button");
    button.classList.add("shape");
    button.setAttribute("select-shape", shape.name);
    button.textContent = shape.name.charAt(0).toUpperCase() + shape.name.slice(1);
    shapeButtonsContainer.appendChild(button);
  });


  //add event listeners to color and shape buttons
  const colorButtons = document.querySelectorAll('.color');
  colorButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentColor = button.getAttribute('select-color');
      canvas.setAttribute("current-color", currentColor);
    });
  });
  
  const shapeButtons = document.querySelectorAll('.shape');
  shapeButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentShape = button.getAttribute('select-shape');
      canvas.setAttribute("current-shape", currentShape);
    });
  });


//default selections
let currentShape = "circle"; //which shape
let drawing = false; //first mouse press
let x1, y1, x2, y2;
let tempShape = null; //declare temp line

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawTemp);
canvas.addEventListener("mouseup", endDraw);


//starting location
function startDraw(e) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    x1 = x;
    y1 = y;
    drawing = true;

    if (currentShape === "line") {
        tempShape = document.createElementNS(ns, "line");
        tempShape.setAttributeNS(null, "x1", x);
        tempShape.setAttributeNS(null, "y1", y);
        tempShape.setAttributeNS(null, "x2", x);
        tempShape.setAttributeNS(null, "y2", y);
        tempShape.setAttributeNS(null, "stroke", "gray"); //temp line is grey
        canvas.appendChild(tempShape);
      } else if (currentShape === "circle") {
        tempShape = document.createElementNS(ns, "circle");
        tempShape.setAttributeNS(null, "cx", x);
        tempShape.setAttributeNS(null, "cy", y);
        tempShape.setAttributeNS(null, "r", 0);
        tempShape.setAttributeNS(null, "stroke", "gray");
        tempShape.setAttributeNS(null, "fill", "transparent");
        canvas.appendChild(tempShape);
      }
}

//temporary shape 
function drawTemp(e) {
    if (drawing) {
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        //line
        if (currentShape === "line") {
            tempShape.setAttributeNS(null, "x2", x);
            tempShape.setAttributeNS(null, "y2", y);
            //circle
          } else if (currentShape === "circle") {
            let dx = x - x1;
            let dy = y - y1;
            let radius = Math.sqrt(dx*dx + dy*dy);
            tempShape.setAttributeNS(null, "cx", x1);
            tempShape.setAttributeNS(null, "cy", y1);
            tempShape.setAttributeNS(null, "r", radius);
          }
    }
}

//final location 
function endDraw(e) {
    if (drawing) {
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        // const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`; //get a random color for the final line

        const currentColor = canvas.getAttribute("current-color");

        if (currentShape === "line") {
            let finalLine = document.createElementNS(ns, "line");
            finalLine.setAttributeNS(null, "x1", x1);
            finalLine.setAttributeNS(null, "y1", y1);
            finalLine.setAttributeNS(null, "x2", x);
            finalLine.setAttributeNS(null, "y2", y);
            finalLine.setAttributeNS(null, "stroke", currentColor);
            finalLine.classList.add("line");
            canvas.appendChild(finalLine);
          } else if (currentShape === "circle") {
            let radius = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
            let finalCircle = document.createElementNS(ns, "circle");
            finalCircle.setAttributeNS(null, "cx", x1);
            finalCircle.setAttributeNS(null, "cy", y1);
            finalCircle.setAttributeNS(null, "r", radius);
            finalCircle.setAttributeNS(null, "fill", currentColor);
            finalCircle.classList.add("circle");
            canvas.appendChild(finalCircle);
          }
      
          drawing = false;
          canvas.removeChild(tempShape); //remove temp shape
    }
}


// function random(max) {
//     return Math.floor(Math.random() * (max + 1));
// }

//color button events and getting rgb colors from css
const mpnButton = document.querySelector(".color[select-color='mammoth-purple-night']");
const mpButton = document.querySelector(".color[select-color='mammoth-purple']");
const mpdButton = document.querySelector(".color[select-color='mammoth-purple-dusk']");
const mppButton = document.querySelector(".color[select-color='mammoth-purple-pale']");
const rfButton = document.querySelector(".color[select-color='robert-frost']");
const tButton = document.querySelector(".color[select-color='tusk']");
const iaButton = document.querySelector(".color[select-color='ice-age']");
const slButton = document.querySelector(".color[select-color='spring-leaf']");
const alButton = document.querySelector(".color[select-color='autumn-leaf']");

mpnButton.addEventListener("click", () => {
    const color = window.getComputedStyle(mpnButton).getPropertyValue("background-color");
    canvas.setAttribute("current-color", color);
  });

mpButton.addEventListener("click", () => {
    const color = window.getComputedStyle(mpButton).getPropertyValue("background-color");
    canvas.setAttribute("current-color", color);
  });

  mpdButton.addEventListener("click", () => {
    const color = window.getComputedStyle(mpdButton).getPropertyValue("background-color");
    canvas.setAttribute("current-color", color);
  });
  mppButton.addEventListener("click", () => {
    const color = window.getComputedStyle(mppButton).getPropertyValue("background-color");
    canvas.setAttribute("current-color", color);
  });
  rfButton.addEventListener("click", () => {
    const color = window.getComputedStyle(rfButton).getPropertyValue("background-color");
    canvas.setAttribute("current-color", color);
  });
  tButton.addEventListener("click", () => {
    const color = window.getComputedStyle(tButton).getPropertyValue("background-color");
    canvas.setAttribute("current-color", color);
  });
  
  iaButton.addEventListener("click", () => {
    const color = window.getComputedStyle(iaButton).getPropertyValue("background-color");
    canvas.setAttribute("current-color", color);
  });

  slButton.addEventListener("click", () => {
    const color = window.getComputedStyle(slButton).getPropertyValue("background-color");
    canvas.setAttribute("current-color", color);
  });

  alButton.addEventListener("click", () => {
    const color = window.getComputedStyle(alButton).getPropertyValue("background-color");
    canvas.setAttribute("current-color", color);
  });


