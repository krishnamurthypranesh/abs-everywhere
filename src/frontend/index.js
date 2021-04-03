const KEY = "";

function Programme(formElement) {
  this.form = formElement;
  // other definitions go here
}

Programme.prototype.getProgramme = function () {
  // validate form data, send data to the backend and receive programme data
}

Programme.prototype.render = function () {
  // render the programme data received from the backend as a table
}

Programme.prototype.validateFormData = function () {
  // validate the form element, raise alerts and errors as and when requried
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
    window.alert("Form has been submitted!");
  })
}

// entrypoint
document.addEventListener("readystatechange", event => {
  if (event.target.readyState === "interactive") {
    init()
  }
});
