// Megan Huang 
// JavaScript cellular automata

function draw(rule, width, height) {
    const root = document.querySelector("#root");

    //creating the title element with desired text (rule #)
    const title = document.createElement("h1");
    title.textContent = "Rule " + rule;
    root.appendChild(title);

    //initializing the array (by row)
    let array = new Array(width).fill(0);
    //randomly assign 0 or 1 to the first crow 
    for (let i = 1; i < width; i++) {
        array[i] = Math.floor(Math.random() * 2)
    }

    root.appendChild(getRow(array));

    for (let i = 1; i < height; i++) {
        array = applyRule(array, rule);
        root.appendChild(getRow(array));
    }
}

function getRow(array) {
    const row = document.createElement("div");
    row.classList.add("row");

    //iterating through the array length, creating new cells 
    for (let i = 0; i < array.length; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        //appending the correct tile representation to the array 
        if (array[i] == 1) {
            cell.classList.add("filled");
        } else {
            //array value is 0
            cell.classList.add("empty");
        }
        //adding the newly created row of cells
        row.appendChild(cell);
    }
    return row;
}

//implements a single step of a given rule applied to a configuration
//config is an array containing values (states) that are 0 or 1, where config[i] is the state of cell i
//rule is an integer between 0 and 255
//returns a new array of 0-1 values corresponding to the updated states upon applying Rule rule to config
function applyRule(config, rule) {
    const n = config.length;
    const newRow = [];
  
    //gets a set of three bit values, then determines the new bit of the center cell using getBit
    for (let i = 0; i < n; i++) {
      //determines the left cell (if 0, the left=n-1, else left=i-1)
      const left = i == 0 ? config[n - 1] : config[i - 1];
      const center = config[i]; 
      //determines right cell (if last element, right=0, else right=i+1)
      const right = i == n - 1 ? config[0] : config[i + 1];

      const result = getBit(left, center, right, rule); //recieve the new center cell
      //push to the new config array
      newRow.push(result);
    }
  
    return newRow;
  }
  
  //returns the new center cell bit
  function getBit(left, center, right, rule) {
    //left, center, right binary to a decimal 
    //(this is the value of one of the 8 possible states)
    const index = left * 4 + center * 2 + right;
    //gets the corresponding bit from the rule (look up corresponding bit in rule)
    //& operation with 1 on the shifted rule results in a number with a single bit (0 or 1), 
    //depending on the bit of the index position in the original rule.
    const bit = (rule >> index) & 1;
    
    return bit;
  }

  module.exports = { applyRule };