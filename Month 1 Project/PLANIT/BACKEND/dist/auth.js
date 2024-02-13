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
exports.loginController = exports.signupController = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const sqlConfig_1 = require("../Config/sqlConfig");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create a token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    const token = jsonwebtoken_1.default.sign({ id }, "jdhg78ygh9eh934hbui3br783490hjr390h", {
        expiresIn: maxAge,
    });
    return token;
};
// This controller creates a new user and saves their data to the DB
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Generate a random ID for each user
    let id = (0, uuid_1.v4)();
    try {
        // Get the request body
        const { Full_name, Email, Password } = req.body;
        // hash the password using the bcrypt library
        const hash_pwd = yield bcrypt_1.default.hash(Password, 5);
        // Create new pool connection
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        // execute a stored procedure to store the user data
        let result = (yield pool
            .request()
            .input("user_id", mssql_1.default.VarChar, id)
            .input("full_name", mssql_1.default.VarChar, Full_name)
            .input("email", mssql_1.default.VarChar, Email)
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
exports.signupController = signupController;
// Login a user
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // get the request body
        const { Email, Password } = req.body;
        // Create a new pool connection
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        // execute a stored procedure to get & verify login details
        let user = (yield pool
            .request()
            .input("email", mssql_1.default.VarChar, Email)
            .execute("loginUser")).recordset;
        // check for a record with the parsed email
        // record not found: return an error
        if (((_a = user[0]) === null || _a === void 0 ? void 0 : _a.email) == Email) {
            // Compare pwd from the request body and the hashed pwd from the db
            const isPwd = yield bcrypt_1.default.compare(Password, user[0].password);
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
exports.loginController = loginController;
