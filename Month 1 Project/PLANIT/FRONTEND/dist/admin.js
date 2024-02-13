"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Load HTML elements
let parentTable = document.querySelector(".styled-table");
// Select the elements
let Add = document.querySelector(".add");
let assignBtn = document.querySelector(".assign");
let allProjBtn = document.querySelector(".allProj");
let newProjectDiv = document.querySelector(".cart-container");
let reassignDiv = document.querySelector(".cart-container2");
let allProjDiv = document.querySelector(".project");
let addBtn = document.querySelector(".addBtn");
let select = document.querySelector("#assignee");
let resBtn = document.querySelector(".resBtn");
let projectArray = [];
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Hello");
    yield getProjects();
    yield getUsers();
});
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
function getProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield fetch("http://localhost:3002/projects/allprojects");
            let projects = yield res.json();
            projects.result.forEach((project) => {
                projectArray.push(project);
            });
            displayProjects();
        }
        catch (error) {
            console.log(error);
        }
    });
}
function displayProjects() {
    if (projectArray.length >= 1) {
        projectArray.forEach((project) => {
            let tableRow = document.createElement("tr");
            let checkBoxData = document.createElement("td");
            let checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBoxData.appendChild(checkBox);
            let projectTitle = document.createElement("td");
            projectTitle.textContent = project.ProjectName;
            let projectDesc = document.createElement("td");
            projectDesc.textContent = project.projectDescription;
            let projectAsignee = document.createElement("td");
            projectAsignee.textContent = project.assigneeName;
            let endDate = document.createElement("td");
            endDate.textContent = project.endDate;
            tableRow.appendChild(checkBoxData);
            tableRow.appendChild(projectTitle);
            tableRow.appendChild(projectDesc);
            tableRow.appendChild(projectAsignee);
            tableRow.appendChild(endDate);
            parentTable.appendChild(tableRow);
        });
    }
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield fetch(" http://localhost:3002/users/allusers");
            let users = yield res.json();
            console.log(users.result);
            users.result.forEach((user) => {
                let userOption = document.createElement("option");
                userOption.value = user.User_id;
                userOption.textContent = user.Full_name;
                select.appendChild(userOption);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
