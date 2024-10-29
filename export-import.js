document.getElementById("export").addEventListener("click", exportData);

// Function for Export file
function exportData(e) {
  let blob = new Blob([JSON.stringify(state)], { type: "text/plain" });

  let downloadLink = URL.createObjectURL(blob);

  e.target.href = downloadLink;
  e.target.download = `${selectedSheet}.json`;
}

// Function for import file

const fileInput = document.getElementById("import");

fileInput.addEventListener("change", (e) => {
  let file = e.target.files[0];

  let fileReader = new FileReader();

  fileReader.onload = function (e) {
    const extractedData = JSON.parse(e.target.result);

    for (let cell in extractedData) {
      const cellElement = document.getElementById(cell);
      state[cell] = extractedData[cell];
      applyStylesToElement(cellElement, extractedData[cell]);
    }
  };

  fileReader.readAsText(file);
});

document.addEventListener("DOMContentLoaded", function () {
  let extractedData = localStorage.getItem(`sheet${sheetCnt}`);
  if (extractedData) {
    // If the data is present then applying the data on the cells and setting state as the previous data
    state = JSON.parse(extractedData);
    for (let key in state) {
      const element = document.getElementById(key);
      applyStylesToElement(element, state[key]);
    }
  }

  while (extractedData) {
    extractedData = localStorage.getItem(`sheet${sheetCnt + 1}`);
    if(extractedData) createNewSheet();
  }
});
