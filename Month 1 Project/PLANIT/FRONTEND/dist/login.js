"use strict";
let logform = document.querySelector(".form");
let logemail = document.querySelector("#Email");
let logpassword = document.querySelector("#Password");
window.onload = () => {
    let data = localStorage.getItem("users");
    const UsersInfo = data ? JSON.parse(data) : [];
};
// Function to authenticate user based on provided credentials
function authenticateUser(credentials) {
    // Find user with matching email
    const user = UsersInfo.find((user) => user.email === credentials.email);
    // If user exists and password matches, return user object
    if (user && user.password === credentials.password) {
        return user;
    }
    else {
        return undefined; // Authentication failed
    }
}
// Modify the event listener to handle user authentication
logform.addEventListener("submit", (e) => {
    e.preventDefault();
    // Get user input values
    let logemailValue = logemail.value.trim();
    let logpasswordValue = logpassword.value.trim();
    // Check if the form is valid
    const isFormValid = logemailValue !== "" && logpasswordValue !== "";
    if (isFormValid) {
        // Authenticate the user
        const credentials = {
            email: logemailValue,
            password: logpasswordValue,
        };
        const authenticatedUser = authenticateUser(credentials);
        if (authenticatedUser) {
            // Authentication succeeded
            console.log("Authentication successful. Welcome, " +
                authenticatedUser.fullName +
                "!");
            //   Optionally, redirect the user to another page after successful authentication
            window.location.href = "users.html";
        }
        else {
            // Authentication failed
            console.log("Authentication failed. Please check your credentials.");
        }
    }
    else {
        // Handle the case where the form is not valid (e.g., show an error message)
        console.log("Form is not valid. Please fill in all required fields.");
    }
});
