"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = require("../Controllers/project.controller");
const projectRouter = (0, express_1.Router)();
projectRouter.post('/create', project_controller_1.createProject);
projectRouter.delete('/delete/:id', project_controller_1.deleteProject);
exports.default = projectRouter;
