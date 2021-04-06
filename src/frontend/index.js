const KEY = "";

function Programme(formElement) {
  this.form = formElement;
  // other definitions go here
}

Programme.prototype.getProgramme = function () {
  // validate form data, send data to the backend and receive programme data
  let formData = new Object();
  var name, value, formElement;

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
  console.log(formData);

  // fetch programme data from backend
  fetch("http://localhost:9000/programme/generate/",
    {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json",
      }
    }).then(function (response) {
      if (response.ok) {
        console.log(response.json);
      }
      return Promise.reject(response);
    }).then(function (data) {
      console.log(data);
    }).catch(function (error) {
      console.warn("Something went wrong.", error);
    })
}


Programme.prototype.validateFormData = function () {
  // validate the form element, raise alerts and errors as and when requried
}

Programme.prototype.render = function () {
  // render the programme data received from the backend as a table
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
    programme.getProgramme();
  })
}

// entrypoint
document.addEventListener("readystatechange", event => {
  if (event.target.readyState === "interactive") {
    init()
  }
});
