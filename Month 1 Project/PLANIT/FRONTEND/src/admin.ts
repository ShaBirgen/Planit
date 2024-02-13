// Select the elements
let Add = document.querySelector(".add") as HTMLButtonElement;
let assignBtn = document.querySelector(".assign") as HTMLButtonElement;
let allProjBtn = document.querySelector(".allProj") as HTMLButtonElement;
let newProjectDiv = document.querySelector(".cart-container") as HTMLDivElement;
let reassignDiv = document.querySelector(".cart-container2") as HTMLDivElement;
let allProjDiv = document.querySelector(".project") as HTMLDivElement;
let addBtn = document.querySelector(".addBtn") as HTMLButtonElement;
let resBtn = document.querySelector(".resBtn") as HTMLButtonElement;
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
function toggleVisibility(element: HTMLDivElement) {
  if (element.style.display === "none" || element.style.display === "") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

addBtn.addEventListener("click", () => {});
