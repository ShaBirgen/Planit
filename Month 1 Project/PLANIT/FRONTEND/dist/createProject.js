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
// Load html Elements
let newForm = document.querySelector(".new-form");
let projectName = document.querySelector("#project-name");
let description = document.querySelector("#description");
let endDate = document.querySelector("#end-data");
let userArr = [];
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    yield getUsers();
});
newForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    let isValid = projectName.value.trim() != "" &&
        description.value.trim() != "" &&
        select.value.trim() != "" &&
        endDate.value.trim() != "";
    if (!isValid) {
        alert("Please Fill in all the fields");
    }
    else {
        let res = yield fetch("http://localhost:3001/projects/create", {
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
        let data = yield res.json();
        console.log(data);
    }
}));
