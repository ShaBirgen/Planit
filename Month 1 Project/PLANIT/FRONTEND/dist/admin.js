"use strict";
// Select the elements
let Add = document.querySelector(".add");
let assignBtn = document.querySelector(".assign");
let allProjBtn = document.querySelector(".allProj");
let newProjectDiv = document.querySelector(".cart-container");
let reassignDiv = document.querySelector(".cart-container2");
let allProjDiv = document.querySelector(".project");
let addBtn = document.querySelector(".addBtn");
let resBtn = document.querySelector(".resBtn");
// let  = document.querySelector(".add") as HTMLButtonElement;
// Add event listeners to the buttons
Add.addEventListener("click", () => {
    toggleVisibility(newProjectDiv);
});
assignBtn.addEventListener("click", () => {
    toggleVisibility(reassignDiv);
});
allProjBtn.addEventListener("click", () => {
    // Implement logic to show all projects, if needed
    toggleVisibility(allProjDiv);
});
// Function to toggle visibility of a div element
function toggleVisibility(element) {
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
    }
    else {
        element.style.display = "none";
    }
}
addBtn.addEventListener("click", () => { });
