const KEY = "";

function Programme(formElement) {
  this.form = formElement;
  this.formData = new Object();
  this.programme = new Array();
}

Programme.prototype.fetchProgramme = function () {
  var programmeData;

  function fetchFromBackend(formData) {
    fetch("http://localhost:8000/programme/generate/",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        }
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        }
      }).then(function (data) {
        return data;
      }).catch(function (error) {
        console.warn("Something went wrong.", error);
      })
  }
  fetchFromBackend(this.formData)
}

Programme.prototype.validateFormData = function () {
  let formData = new Object();
  var name, value, formElement, programme;

  for (var i=0; i < this.form.children.length; i++) {
    formElement = this.form.children[i];
    name = formElement.getAttribute("for");

    if (name === "mass") {
      value = {"value": formElement.children[0].value,
      "unit": formElement.children[1].value,}
    } else if (name === "days" || name === "loading") {
      value = Array.from(
      formElement.children).
        filter(x => x.children[0].checked === true).
        map(x => x.children[0].value);
    } else if (name === "exercise_type" || name === "training_method") {
      value = formElement.children[0].children[0].value;
    } else {
      value = formElement.children[0].value;
    }

    formData[name] = value;
  }
  this.formData = formData;
}


async function fetchProgramme(formData) {
  let response;

  response = await fetch(
    "http://localhost:8000/programme/generate/",
    {
      method: "POST", 
      body: JSON.stringify(formData),
      headers: {"Content-Type": "application/json"},
    })

  return await response.json();
}

function render (programmeData) {
  // render the programme data received from the backend as a table

  let tableBody, cellElement, tableCell, row, rowElement;
  elem = document.createElement("table");

  tableBody = document.createElement("tbody");
  elem.appendChild(tableBody);

  for (var i=0; i < programmeData.length; i++) {
    row = programmeData[i];
    tableRow = document.createElement("tr");

    if (i === 0) {
      cellElement = "th";
    } else {
      cellElement = "td";
    }

    for (var j=0; j < row.length; j++) {
      tableCell = document.createElement(cellElement);
      tableCell.innerText = row[j];

      tableRow.appendChild(tableCell);
    }
    tableBody.appendChild(tableRow);
  }
  return elem;
}


// function to toggle element display
function toggleDisplay(element) {
  if (element.classList.contains("hide")) {
    element.classList.remove("hide");
  } else {
    element.classList.add("hide");
  }
}

// controller
function init() {
  let programme = new Programme(document.getElementById("volume-cycle-form"));

  document.getElementById("new-volume-cycle").addEventListener("click",
  event => {
    toggleDisplay(event.target);
    toggleDisplay(programme.form.parentElement);
  });

  document.getElementById("volume-cycle-form-container").children[1].addEventListener(
  "click", event => {
    event.preventDefault();

    toggleDisplay(programme.form.parentElement);

    programme.validateFormData();

    fetchProgramme(programme.formData).
      then(data => {
        const table = render(data);
        programme.table = table;
        document.getElementById("programme-table-container").
          appendChild(programme.table);
    });

    toggleDisplay(document.getElementById("programme-table-container"));
  })
}

// entrypoint
document.addEventListener("readystatechange", event => {
  if (event.target.readyState === "interactive") {
    init()
  }
});
