let haveAccountRef = document.querySelector(".have-account-href") as HTMLAnchorElement;
let registerBtn = document.querySelector(".register-btn") as HTMLButtonElement;
let user_register_form = document.querySelector('#user-register-form') as HTMLFormElement
let first_name = document.querySelector("#first-name-id") as HTMLInputElement
let last_name = document.querySelector("#last-name-id") as HTMLInputElement
let reg_email = document.querySelector("#email") as HTMLInputElement
let reg_pwd = document.querySelector('#password') as HTMLInputElement

// Interface for a new user
interface newUser {
    id: number
    fullName: string;
    email: string;
    password: string;
    status: string;
}
// registerBtn.addEventListener("click",(e)=>{
//     e.preventDefault();

//     alert("Account has been created");
// })
let users: newUser[] = []
window.onload = ()=> {
    let data:any = localStorage.getItem("pimsUser")
    data = JSON.parse(data);
    

    if(!data) {
        return false
    } else {
        data.forEach((user:any) => {
            users.push(user)
        });
        saves.saveUser();
    }
}



haveAccountRef.addEventListener("click",(e)=>{
    e.preventDefault();

    window.location.href="login.html"
})

user_register_form.addEventListener('submit', (e) => {
    e.preventDefault()

    let isvalid = first_name.value.trim() != "" &&
    last_name.value.trim() != "" &&
    email.value.trim() != "" &&
    password.value.trim() != ""

    if(!isvalid) {
        return alert("Please fill in all the fields");
    } else {
        let user: newUser = {
            id: users.length + 1,
            fullName: first_name.value.trim() + last_name.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(),
            status: "user"
        }

        users.push(user)
        saves.saveUser()

        alert("Account has been created and logged in");
        window.location.href="user-dashboard.html";
    }
})

// Classes to handle saving and retrieval of the local storage
class localSaves {
    saveUser(){
        return localStorage.setItem('pimsUser', JSON.stringify(users))
    }
}

let saves = new localSaves;