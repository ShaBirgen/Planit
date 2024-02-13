import mssql, { ConnectionPool, Request } from "mssql";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { sqlConfig } from "../Config/sqlConfig";

// Create a connection pool
// const pool = mssql.connect(sqlConfig);
// const poolConnect = pool.connect();

// Define types for user data
interface user {
  User_id: string;
  Full_name: string;
  Email: string;
  Password: string;
}

// Function to create a new user
export const createUser = async (
  Full_name: string,
  Email: string,
  Password: string
): Promise<any> => {
  // await pool;
  
  try {
    const id = v4();
    const hashedPassword = await bcrypt.hash(Password, 5); // Hash the password

    const pool = await mssql.connect(sqlConfig)
    let result = (await pool.request().query(`
    INSERT INTO Users (User_id, Full_name, Email, Password)
    VALUES ('${id}', '${Full_name}', '${Email}', '${hashedPassword}')
    `)).recordset;
    
    return result;
  } catch (error) {
    throw error;
  }
};

//LOGIN USER

export const loginUser = async (Email: string, Password: string) => {
  
  try {
    const pool = await mssql.connect(sqlConfig)
    const result = (await pool.request()
    .input("Email", mssql.VarChar, Email)
    .execute("loginUser") 
    ).recordset
    
    console.log(result);
    
    return result;
  } catch (error) {
    throw error;
  }
};

