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
const uuid_1 = require("uuid");
const sqlConfig_1 = require("../Config/sqlConfig");
const bcrypt_1 = __importDefault(require("bcrypt"));
const pool = new mssql_1.default.ConnectionPool(sqlConfig_1.sqlConfig);
const poolConnect = pool.connect();
const createUser = (Full_name, Email, Password) => __awaiter(void 0, void 0, void 0, function* () {
    yield poolConnect;
    const id = (0, uuid_1.v4)(); // Generate a unique ID for the user
    const hashedPassword = yield bcrypt_1.default.hash(Password, 12); // Hash the password
    try {
        const request = pool.request();
        const result = yield request.query(`
      INSERT INTO Users (User_id, Full_name, Email, Password)
      VALUES ('${id}', '${Full_name}', '${Email}', '${hashedPassword}')
    `);
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
const loginUser = (Email, Password) => __awaiter(void 0, void 0, void 0, function* () {
    yield poolConnect;
    try {
        const request = pool.request();
        const result = yield request.query(`
      SELECT id, Email, Password FROM Users WHERE Email = '${Email}'
    `);
        return result.recordset[0]; // Return the first matching user
    }
    catch (error) {
        throw error;
    }
});
exports.loginUser = loginUser;
