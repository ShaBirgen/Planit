// Load html Elements
let newForm = document.querySelector(".new-form") as HTMLFormElement;
let projectName = document.querySelector("#project-name") as HTMLInputElement;
let description = document.querySelector("#description") as HTMLInputElement;
let endDate = document.querySelector("#end-data") as HTMLInputElement;

let userArr: any[] = [];
window.onload = async () => {
  await getUsers();
};

newForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let isValid =
    projectName.value.trim() != "" &&
    description.value.trim() != "" &&
    select.value.trim() != "" &&
    endDate.value.trim() != "";

  if (!isValid) {
    alert("Please Fill in all the fields");
  } else {
    let res = await fetch("http://localhost:3001/projects/create", {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        ProjectName: projectName.value.trim(),
        ProjectDescription: description.value.trim(),
        AssignedTo: select.value.trim(),
        AssigneeName: select.value.trim(),
        EndDate: endDate.value.trim(),
      }),
    });

    let data = await res.json();
    console.log(data);
  }
});
