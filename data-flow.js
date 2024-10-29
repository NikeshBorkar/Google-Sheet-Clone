const selectedCellElement = document.querySelector(".selected-cell");
const form = document.querySelector(".head-form");
const loader = document.getElementById("saving_div");

let state = {};

let selectedCell = null;
let sheetCnt = 1,
  selectedSheet = "sheet1";

// Default styles for cells
const defaultStyles = {
  innerText: "",
  fontFamily: "",
  fontSize: 14,
  bold: false,
  italic: false,
  underline: false,
  align: "left",
  bgColor: "#ffffff",
  textColor: "#000000",
};

// function to apply current styles to the cells
function applyStylesToElement(cellElement, styleObj) {
  cellElement.innerText = styleObj.innerText;
  cellElement.style.fontFamily = styleObj.fontFamily;
  cellElement.style.fontSize = `${styleObj.fontSize}px`;
  cellElement.style.fontWeight = styleObj.bold ? "bold" : "lighter";
  cellElement.style.fontStyle = styleObj.italic ? "italic" : "normal";
  cellElement.style.textDecoration = styleObj.underline ? "underline" : "none";
  cellElement.style.textAlign = styleObj.align;
  cellElement.style.backgroundColor = styleObj.bgColor;
  cellElement.style.color = styleObj.textColor;
}

form.addEventListener("input", (e) => {
  if (selectedCell) {
    loader.style.display = "flex";
    // Checking that any cell is selected or not to apply style
    const currentCell = document.getElementById(selectedCell);
    // Extracting styles from the form
    const currentStyles = {
      innerText: currentCell.innerText,
      fontFamily: form.fontFamily.value,
      fontSize: form.fontSize.value,
      bold: form.bold.checked,
      italic: form.italic.checked,
      underline: form.underline.checked,
      align: form.align.value,
      bgColor: form.bgColor.value,
      textColor: form.textColor.value,
    };

    // Applying the extracted styles on the selected cell
    applyStylesToElement(currentCell, currentStyles);
    state[selectedCell] = currentStyles;
    localStorage.setItem(selectedSheet, JSON.stringify(state)); // Saving the current sheet data in the local storage.
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }
});

// Callback function for onFocus event on cells
function onCellFocus(e) {
  if (selectedCell) {
    // Checking  If previously any cell is selected or not.
    const prevCell = document.getElementById(selectedCell);
    prevCell.classList.remove("active-cell"); // If selected then removing the active-cell class from it.
  }

  selectedCell = e.target.id; // Setting the Currently focused cell as selectedCell
  selectedCellElement.innerText = selectedCell;
  e.target.classList.add("active-cell"); //Adding the active-cell class to the currently selectedCell

  if (!state[selectedCell]) {
    state[selectedCell] = { ...defaultStyles };
  }

  applyCurrentStylesToForm();
}

// Function to apply the styles to form of currently selectedCell
function applyCurrentStylesToForm() {
  for (let key in state[selectedCell]) {
    form[key].type === "checkbox"
      ? (form[key].checked = state[selectedCell][key])
      : (form[key].value = state[selectedCell][key]);
  }
}

// Adding keyup event to fx input
const fx = document.getElementById("fx");
fx.addEventListener("keyup", (e) => {
  if (e.code === "Enter" && selectedCell) {
    const selectedElement = document.getElementById(selectedCell);
    selectedElement.innerText = eval(fx.value);
    fx.value = "";
  }
});

// Function to set innerText
function setInnerText() {
  loader.style.display = "flex";
  const currentCell = document.getElementById(selectedCell);
  state[selectedCell].innerText = currentCell.innerText;
  localStorage.setItem(selectedSheet, JSON.stringify(state)); // Saving the current sheet data in the local storage.

  setTimeout(() => {
    loader.style.display = "none";
  }, 1500);
}

const footForm = document.querySelector(".foot-form");

// Adding change event listener to the foot form
footForm.addEventListener("change", (e) => {
  localStorage.setItem(selectedSheet, JSON.stringify(state)); // Saving the current sheet data in the local storage.
  form.reset();
  for (let cellId in state) {
    //Clearing all the styles from the cells;
    clearData(cellId);
  }

  const newSheetName = e.target.value;
  const existingData = localStorage.getItem(newSheetName); //Checking if the data of new sheet is present in local storage or not.
  if (existingData) {
    // If the data is present then applying the data on the cells and setting state as the previous data
    state = JSON.parse(existingData);
    for (let key in state) {
      const element = document.getElementById(key);
      applyStylesToElement(element, state[key]);
    }
  } else {
    // If data is not present then setting the state of cells as empty.
    state = {};
  }

  selectedSheet = newSheetName;
  selectedCell = null;
  selectedCellElement.innerText = "NA";
});

// Function to create new sheet
function createNewSheet() {
  sheetCnt++;

  const newSheetName = `sheet${sheetCnt}`;
  const newSheetContainer = document.createElement("div");

  newSheetContainer.innerHTML = `
  <input type="radio" name="sheet" id="${newSheetName}" value="${newSheetName}" >
  <label for="${newSheetName}">${newSheetName[0].toUpperCase()}${newSheetName.slice(
    1
  )}</label>`;

  footForm.appendChild(newSheetContainer);
}

// Function to clear the styles from cell.
function clearData(cellId) {
  const cell = document.getElementById(cellId);
  cell.innerText = "";
  cell.removeAttribute("style");
  cell.classList.remove("active-cell");
}
