"use strict";
// authController.ts
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
exports.signup = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Your JWT secret key
// Function to handle user login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Check if the user exists in the database
        const user = yield Users.findOne({ email });
        // If the user doesn't exist, return an error
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // If the user exists, compare passwords
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        // If passwords don't match, return an error
        if (!isPasswordMatch) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }
        // If passwords match, generate a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "1h",
        });
        // Return the token in the response
        res.status(200).json({ token });
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
// Function to handle user signup
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Check if the user already exists in the database
        const existingUser = yield User.findOne({ email });
        // If the user already exists, return an error
        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
            return; // Import reqquired libraries
            import { Request, Response } from "express";
            import mssql from "mssql";
            import { v4 } from "uuid";
            import { sqlConfig } from "../config/sql.config";
            import { loginInterface, signupInterface, } from "../interface/auth.interface";
            import bcrypt from "bcrypt";
            import jwt from "jsonwebtoken";
            import dotenv from "dotenv";
            dotenv_1.default.config();
            // Create a token
            const maxAge = 3 * 24 * 60 * 60;
            const createToken = (id) => {
                const token = jsonwebtoken_2.default.sign({ id }, "jdhg78ygh9eh934hbui3br783490hjr390h", {
                    expiresIn: maxAge,
                });
                return token;
            };
            // This controller creates a new user and saves their data to the DB
            export const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                // Generate a random ID for each user
                let id = (0, uuid_1.v4)();
                try {
                    // Get the request body
                    const { full_name, email, password } = req.body;
                    // hash the password using the bcrypt library
                    const hash_pwd = yield bcrypt_2.default.hash(password, 5);
                    // Create new pool connection
                    const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
                    // execute a stored procedure to store the user data
                    let result = (yield pool
                        .request()
                        .input("user_id", mssql_1.default.VarChar, id)
                        .input("full_name", mssql_1.default.VarChar, full_name)
                        .input("email", mssql_1.default.VarChar, email)
                        .input("password", mssql_1.default.VarChar, hash_pwd)
                        .execute("createUser")).recordset;
                    return res.json({
                        message: "User created successfully",
                        result,
                    });
                }
                catch (error) {
                    return res.json(error);
                }
            });
            // Login a user
            export const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                try {
                    // get the request body
                    const { email, password } = req.body;
                    // Create a new pool connection
                    const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
                    // execute a stored procedure to get & verify login details
                    let user = (yield pool
                        .request()
                        .input("email", mssql_1.default.VarChar, email)
                        .execute("loginUser")).recordset;
                    // check for a record with the parsed email
                    // record not found: return an error
                    if (((_a = user[0]) === null || _a === void 0 ? void 0 : _a.email) == email) {
                        // Compare pwd from the request body and the hashed pwd from the db
                        const isPwd = yield bcrypt_2.default.compare(password, user[0].password);
                        // console.log(isPwd);
                        // Incorrect pwd: return an error
                        // correct pwd: return success message
                        if (!isPwd) {
                            return res.status(401).json({
                                passerror: "Incorrect Password",
                            });
                        }
                        else {
                            const token = createToken(user[0].user_id);
                            return res.status(200).json({
                                success: "Login success",
                                token,
                            });
                        }
                    }
                    else {
                        return res.status(401).json({
                            emailerror: "User not found",
                        });
                    }
                }
                catch (error) {
                    return res.json({ error });
                }
            });
        }
        // If the user doesn't exist, hash the password
        const hashedPassword = yield bcrypt_2.default.hash(password, 12);
        // Create a new user in the database
        const newUser = new User({
            email,
            password: hashedPassword,
        });
        // Save the user to the database
        yield newUser.save();
        // Return a success message
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.signup = signup;
