// Load HTML elements
let parentTable = document.querySelector(
  ".styled-table"
) as HTMLTableSectionElement;
// Select the elements
let Add = document.querySelector(".add") as HTMLButtonElement;
let assignBtn = document.querySelector(".assign") as HTMLButtonElement;
let allProjBtn = document.querySelector(".allProj") as HTMLButtonElement;
let newProjectDiv = document.querySelector(".cart-container") as HTMLDivElement;
let reassignDiv = document.querySelector(".cart-container2") as HTMLDivElement;
let allProjDiv = document.querySelector(".project") as HTMLDivElement;
let addBtn = document.querySelector(".addBtn") as HTMLButtonElement;
let select = document.querySelector("#assignee") as HTMLSelectElement;
let resBtn = document.querySelector(".resBtn") as HTMLButtonElement;
// let  = document.querySelector(".add") as HTMLButtonElement;

interface projectInteface {
  Project_id: string;
  ProjectName: string;
  projectDescription: string;
  assignedTo: string;
  assigneeName: string;
  endDate: string;
  isCompleted: boolean;
}

let projectArray: projectInteface[] = [];

window.onload = async () => {
  console.log("Hello");
  
  await getProjects();
  await getUsers();
};
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

async function getProjects() {
  try {
    let res = await fetch("http://localhost:3002/projects/allprojects");

    let projects = await res.json();
    projects.result.forEach((project: projectInteface) => {
      projectArray.push(project);
    });

    displayProjects();
  } catch (error) {
    console.log(error);
  }
}

function displayProjects() {
  if (projectArray.length >= 1) {
    projectArray.forEach((project) => {
      let tableRow = document.createElement("tr") as HTMLTableRowElement;

      let checkBoxData = document.createElement("td") as HTMLTableCellElement;

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

async function getUsers() {
  try {
    let res = await fetch(" http://localhost:3002/users/allusers");

    let users = await res.json();
    console.log(users.result);

    users.result.forEach((user: any) => {
      let userOption = document.createElement("option");
      userOption.value = user.User_id;
      userOption.textContent = user.Full_name;
      select.appendChild(userOption);
    });
  } catch (error) {
    console.log(error);
  }
}
