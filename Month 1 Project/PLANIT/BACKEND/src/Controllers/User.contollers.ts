import { Request, Response, request } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { sqlConfig } from "../Config/sqlConfig";

//GET ALL USERS

export const allUsers = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    let result = (await pool.request().execute("allUsers")).recordset;

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};
