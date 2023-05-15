const form = document.querySelector("form");
const firstName = document.querySelector("#firstName");
const firstNameError = document.querySelector("#firstNameError");
const surName = document.querySelector("#surName");
const surNameError = document.querySelector("#surNameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const textArea = document.querySelector("#textArea");
const textAreaError = document.querySelector("#textAreaError");
const button = document.querySelector(".sub-button");


// Function to enable/disable the button
function updateButtonState() {
    // validate the input data
    if (checkLength(firstName.value, 5) && checkLength(surName.value, 5) && validateEmail(email.value) && checkLength(subject.value, 15) && checkLength(textArea.value, 25)) {
        button.disabled = false;
    } else {
        messageValid.innerHTML = "Please fill out all the required fields!";
        button.disabled = true;
    }
}

// Function to handle form submission
function submitForm(event) {
    event.preventDefault();

    // check if all required fields have been filled out
    if (checkLength(firstName.value, 1) === true) {
        firstNameError.style.display = "none";
    } else {
        firstNameError.style.display = "block";
    }
    if (checkLength(surName.value, 1) === true) {
        surNameError.style.display = "none";
    } else {
        surNameError.style.display = "block";
    }
    if (validateEmail(email.value) === true) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }
    if (checkLength(subject.value, 1) === true) {
        subjectError.style.display = "none";
    } else {
        subjectError.style.display = "block";
    }
    if (checkLength(textArea.value, 25) === true) {
        textAreaError.style.display = "none";
    } else {
        textAreaError.style.display = "block";
    }

    // if all input is valid, change the button text to "Submitted"
    if (checkLength(firstName.value, 1) && checkLength(surName.value, 1) && validateEmail(email.value) && checkLength(subject.value, 15) && checkLength(textArea.value, 25)) {
        button.style.display = "none";
        // firstName.style.display = "none";
        // surName.style.display = "none";
        // email.style.display = "none";
        // subject.style.display = "none";
        // textArea.style.display = "none";
        messageValid.innerHTML = "Thank you for submitting the form!";
        messageValid.style.color = "white";
        messageValid.style.fontSize = "40px";
        messageValid.style.marginTop = "30px";
    }
}


// Add event listeners to form fields
firstName.addEventListener("keyup", updateButtonState);
surName.addEventListener("keyup", updateButtonState);
email.addEventListener("keyup", updateButtonState);
subject.addEventListener("keyup", updateButtonState);
textArea.addEventListener("keyup", updateButtonState);

// Add event listener to form submission
form.addEventListener("submit", submitForm);


// Helper function to check input length
function checkLength(value, len) {
    return value.trim().length >= len;
}


// Helper function to validate email address
function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
}
