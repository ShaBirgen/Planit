"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../Controllers/auth.controller");
const LoginRouter = (0, express_1.Router)();
// LoginRouter.post("/login", login);
LoginRouter.post('/signup', auth_controller_1.signup);
LoginRouter.post('/login', auth_controller_1.login);
exports.default = LoginRouter;
