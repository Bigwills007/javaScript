const form = document.querySelector("form"),
    nameField = form.querySelector(".name-field"),
    nameInput = nameField.querySelector(".name"),
    emailField = form.querySelector(".email-field"),
    emailInput = emailField.querySelector(".email"),
    passField = form.querySelector(".create-password"),
    passInput = passField.querySelector(".password"),
    cPassField = form.querySelector(".confirm-password"),
    cPassInput = cPassField.querySelector(".cPassword"),
    tbody = document.getElementById("tbody"); // Grabbing the table body for data display

let formArr = JSON.parse(localStorage.getItem("formArr")) || []; // Retrieve data from local storage or initialize an empty array

// Name Validation
function checkName() {
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameInput.value.match(nameRegex)) {
        return nameField.classList.add("invalid");
    }
    nameField.classList.remove("invalid");
}

// Email Validation
function checkEmail() {
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailInput.value.match(emailRegex)) {
        return emailField.classList.add("invalid");
    }
    emailField.classList.remove("invalid");
}

// Hide and show password
const eyeIcons = document.querySelectorAll(".show-hide");

eyeIcons.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
        const pInput = eyeIcon.parentElement.querySelector("input");
        if (pInput.type === "password") {
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return (pInput.type = "text");
        }
        eyeIcon.classList.replace("bx-show", "bx-hide");
        pInput.type = "password";
    });
});

// Password Validation
function createPass() {
    const passRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passInput.value.match(passRegex)) {
        return passField.classList.add("invalid");
    }
    passField.classList.remove("invalid");
}

// Confirm Password Validation
function checkConfirmPassword() {
    if (passInput.value !== cPassInput.value) {
        return cPassField.classList.add("invalid");
    }
    cPassField.classList.remove("invalid");
}

// Add Data to the Table
function displayTableData() {
    tbody.innerHTML = ""; // Clear the current table content to avoid duplication
    formArr.forEach((item, index) => {
        const row = `<tr>
                    <td>${index + 1}</td>
                    <td>${item.Name}</td>
                    <td>${item.Email}</td>
                    <td>${item.Password}</td>
                    <td><i class="bx bx-trash action-icon" onclick="removeRow(${index})"></i></td> <!-- Trash icon for deletion -->
                  </tr>`;
        tbody.innerHTML += row; // Append each row to the table body
    });
}

// Remove Row from Table
function removeRow(index) {
    formArr.splice(index, 1);
    localStorage.setItem("formArr", JSON.stringify(formArr)); // Save updated data to local storage
    displayTableData();
}

// Form Submit Event Listener
form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkName();
    checkEmail();
    createPass();
    checkConfirmPassword();
    if (!form.querySelector(".invalid")) {
        const newData = {
            Name: nameInput.value,
            Email: emailInput.value,
            Password: passInput.value,
        };
        formArr.push(newData);
        localStorage.setItem("formArr", JSON.stringify(formArr)); // Save new data to local storage
        displayTableData();
        form.reset();
    }
});

// Input Event Listeners for Real-Time Validation
nameInput.addEventListener("keyup", checkName);
emailInput.addEventListener("keyup", checkEmail);
passInput.addEventListener("keyup", createPass);
cPassInput.addEventListener("keyup", checkConfirmPassword);

// Initial Load of Table Data
displayTableData();