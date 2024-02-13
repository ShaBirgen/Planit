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
exports.loginUser = exports.createUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const sqlConfig_1 = require("../Config/sqlConfig");
// Function to create a new user
const createUser = (Full_name, Email, Password) => __awaiter(void 0, void 0, void 0, function* () {
    // await pool;
    try {
        const id = (0, uuid_1.v4)();
        const hashedPassword = yield bcrypt_1.default.hash(Password, 5); // Hash the password
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = (yield pool.request().query(`
    INSERT INTO Users (User_id, Full_name, Email, Password)
    VALUES ('${id}', '${Full_name}', '${Email}', '${hashedPassword}')
    `)).recordset;
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
//LOGIN USER
const loginUser = (Email, Password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = (yield pool.request()
            .input("Email", mssql_1.default.VarChar, Email)
            .execute("loginUser")).recordset;
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.loginUser = loginUser;
