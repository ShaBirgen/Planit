import { Request, Response, request } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { sqlConfig } from "../Config/sqlConfig";

export const createProject = (async(req:Request, res:Response) =>{
    try {
        const id= v4()
        const {
          ProjectName,
          ProjectDescription,
          AssignedTo,
          AssigneeName,
          EndDate,
        } = req.body;
const pool = await mssql.connect(sqlConfig)

const result = (
  await pool
    .request()
    .input("Project_id", mssql.UniqueIdentifier, id)
    .input("ProjectName", ProjectName)
    .input("projectDescription", ProjectDescription)
    .input("assignedTo", AssignedTo)
    .input("assigneeName", AssigneeName)
    .input("EndDate", EndDate)
    .execute("createProject")
).recordset;

        res.status(200).json({
            message: "Project created successfully" ,
            result
        }) 

    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

//DELETE PROJECT
export const deleteProject = async(req: Request, res: Response)=>{
  try {
    const id = req.params.id;

    const pool = await mssql.connect(sqlConfig);

    let result = (
      await pool
        .request()
        .input("Project_id", mssql.VarChar, id)
        .execute("deleteProject")
    ).rowsAffected;

    console.log(result[0]);

    if (result[0] == 0) {
      return res.status(201).json({
        error: "Project not found",
      });
    } else {
      return res.status(200).json({
        message: "Project deleted successfully",
      });
    }
  } catch (error) {
    return res.json({ error });
  }
}