//Variables for the register form and error messages
const form = document.querySelector("form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const button = document.querySelector("sub-button");



// Function for the disabled button//
function isButtonDisabled() {
    // validate the input data
    if (validateEmail(email.value)) {
        button.disabled = false;
    } else {
        message.innerHTML = "";
        button.disabled = true;
    }
}

function submitForm(event) {
    event.preventDefault();

// checking the input or an error message will show
    if (validateEmail(email.value) === true) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }
    console.log("U are the best")
}


    form.addEventListener("submit", submitForm);
    email.addEventListener("keyup", isButtonDisabled);

    //check if its a valid email
function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}