"use strict";
let forms = document.querySelector(".form");
let fullName = document.querySelector("#Name");
let email = document.querySelector("#Email");
let password = document.querySelector("#Password");
let submit = document.querySelector("#submit");
const UsersInfo = [];
forms.addEventListener("submit", (e) => {
    e.preventDefault();
    const isFormValid = fullName.value.trim() !== "" &&
        email.value.trim() !== "" &&
        password.value.trim() !== "";
    if (isFormValid) {
        const newUser = {
            fullName: fullName.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(),
        };
        UsersInfo.push(newUser);
        console.log("Hello", UsersInfo);
        // Retrieve existing users from localStorage (if any)
        const existingUsersJSON = localStorage.getItem("users");
        const existingUsers = existingUsersJSON
            ? JSON.parse(existingUsersJSON)
            : [];
        // Append the new user to existing users
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
    else {
        // Handle the case where the form is not valid (e.g., show an error message)
        console.log("Form is not valid. Please fill in all required fields.");
    }
});
