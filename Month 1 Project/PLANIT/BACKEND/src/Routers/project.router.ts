import { Router } from "express";
import { createProject, deleteProject } from "../Controllers/project.controller";

const projectRouter = Router()

projectRouter.post('/create', createProject)
projectRouter.delete('/delete/:id', deleteProject);


export  default projectRouter
