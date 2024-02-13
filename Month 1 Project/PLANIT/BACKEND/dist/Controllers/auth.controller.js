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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login_controllers_1 = require("../Controllers/login.controllers");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Your JWT secret key
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Full_name, Email, Password } = req.body;
    try {
        // Create the user in the database
        yield (0, login_controllers_1.createUser)(Full_name, Email, Password);
        // Return a success message
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Email, Password } = req.body;
    try {
        // Find the user in the database
        const user = yield (0, login_controllers_1.loginUser)(Email, Password);
        // If user not found or password incorrect, return an error
        if (!user || !(yield bcrypt_1.default.compare(Password, user[0].Password))) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        // If authentication successful, generate a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.User_id }, JWT_SECRET, {
            expiresIn: "1h",
        });
        // Return the token
        res.status(200).json({ token });
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
