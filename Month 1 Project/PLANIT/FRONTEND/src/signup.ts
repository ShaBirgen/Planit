let fullName = document.querySelector("#Name") as HTMLInputElement;
let email = document.querySelector("#Email") as HTMLInputElement;
let password = document.querySelector("#Password") as HTMLInputElement;
let submit = document.querySelector("#submit") as HTMLButtonElement;
let form = document.querySelector(".forms") as HTMLFormElement;

const UsersInfo: UsersInfo[] = [];

type UsersInfo = {
  fullName: string;
  email: string;
  password: string;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Hello", UsersInfo);

  const isFormValid =
    fullName.value.trim() !== "" &&
    email.value.trim() !== "" &&
    password.value.trim() !== "";

  if (isFormValid) {
    const newUser: UsersInfo = {
      fullName: fullName.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
    };

    UsersInfo.push(newUser);
    console.log("Hello", UsersInfo);

    // Retrieve existing users from localStorage (if any)
    const existingUsersJSON = localStorage.getItem("users");
    const existingUsers: UsersInfo[] = existingUsersJSON
      ? JSON.parse(existingUsersJSON)
      : [];

    // Append the new user to existing users
    const updatedUsers = [...existingUsers, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("Your account has been created successfully")
    window.location.href = "users.html";
  } else {
    // Handle the case where the form is not valid (e.g., show an error message)
    console.log("Form is not valid. Please fill in all required fields.");
  }
});

