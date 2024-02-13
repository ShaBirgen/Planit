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
exports.allProjects = exports.deleteProject = exports.createProject = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const sqlConfig_1 = require("../Config/sqlConfig");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { ProjectName, ProjectDescription, AssignedTo, AssigneeName, EndDate, } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = (yield pool
            .request()
            .input("Project_id", mssql_1.default.UniqueIdentifier, id)
            .input("ProjectName", ProjectName)
            .input("projectDescription", ProjectDescription)
            .input("assignedTo", AssignedTo)
            .input("assigneeName", AssigneeName)
            .input("EndDate", EndDate)
            .execute("createProject")).recordset;
        res.status(200).json({
            message: "Project created successfully",
            result,
        });
    }
    catch (error) {
        res.status(500).json({
            error,
        });
    }
});
exports.createProject = createProject;
//DELETE PROJECT
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = (yield pool
            .request()
            .input("Project_id", mssql_1.default.VarChar, id)
            .execute("deleteProject")).rowsAffected;
        console.log(result[0]);
        if (result[0] == 0) {
            return res.status(201).json({
                error: "Project not found",
            });
        }
        else {
            return res.status(200).json({
                message: "Project deleted successfully",
            });
        }
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.deleteProject = deleteProject;
const allProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let result = (yield pool.request().execute("allProjects")).recordset;
        res.status(200).json({
            result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error,
        });
    }
});
exports.allProjects = allProjects;
