"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controllers_1 = require("../src/contollers/login.controllers");
const LoginRouter = (0, express_1.Router)();
LoginRouter.post("/create", login_controllers_1.login);
exports.default = LoginRouter;
