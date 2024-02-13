
import { Router } from "express";
import {createUser } from "../Controllers/login.controllers";
import { login, signup } from "../Controllers/auth.controller";

const LoginRouter = Router();

// LoginRouter.post("/login", login);
LoginRouter.post('/signup', signup)
LoginRouter.post('/login', login)

export default LoginRouter;
