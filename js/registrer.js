//Variables for the register form and error messages
const form = document.querySelector("form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const button = document.querySelector(".sub-button");

// Function to enable/disable the button
function updateButtonState() {
    // validate the input data
    if (validateEmail(email.value)) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

// Function to handle form submission
function submitForm(event) {
    event.preventDefault();

    // check if all required fields have been filled out
    if (validateEmail(email.value) === true) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }

    // if all input is valid, hide button
    if (validateEmail(email.value)) {
        button.style.display = "none";
        messageValid.innerHTML = "Thank you for subscribing!";
        messageValid.style.color = "white";
        messageValid.style.fontSize = "40px";
        messageValid.style.marginTop = "20px";
    }
}

form.addEventListener("submit", submitForm);
email.addEventListener("keyup", updateButtonState);

// check if it's a valid email
function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}
