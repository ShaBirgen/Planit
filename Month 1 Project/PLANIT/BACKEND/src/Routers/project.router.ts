import { Router } from "express";
import { allProjects, createProject, deleteProject } from "../Controllers/project.controller";

const projectRouter = Router()

projectRouter.post('/create', createProject)
projectRouter.delete('/delete/:id', deleteProject);
projectRouter.get('/allprojects', allProjects)


export  default projectRouter
