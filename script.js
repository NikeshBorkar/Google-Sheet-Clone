const header = document.querySelector(".header");
const body = document.querySelector(".body");

let colomn = 27,
  row = 50;

for (let i = 0; i < 27; i++) {
  const cell = document.createElement("div");

  i != 0 && (cell.innerText = String.fromCharCode(64 + i));
  i == 0 ? (cell.className = "first-cell") : (cell.className = "cell");
  header.appendChild(cell);
}

for (let i = 1; i <= row; i++) {
  const row = document.createElement("div");
  row.className = "row";
  for (let j = 0; j < 27; j++) {
    const cell = document.createElement("div");

    if (j == 0) {
      cell.className = "first-cell";
      cell.innerText = i;
    } else {
      cell.id = `${String.fromCharCode(64 + j)}${i}`;
      cell.className = "cell";
      cell.contentEditable = "true";
      cell.addEventListener("focus", onCellFocus);
      cell.addEventListener("input", setInnerText);
    }
    row.appendChild(cell);
  }
  body.appendChild(row);
}
