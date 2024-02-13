import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, loginUser } from "../Controllers/login.controllers";
import { loginInterface } from "../Interface/login.interface";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Your JWT secret key

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { Full_name, Email, Password } = req.body;

  try {
    // Create the user in the database
    await createUser(Full_name, Email, Password);

    // Return a success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { Email, Password } = req.body;

  try {
    // Find the user in the database
    const user: any = await loginUser(Email, Password);

    // If user not found or password incorrect, return an error
    if (!user || !(await bcrypt.compare(Password, user[0].Password))) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // If authentication successful, generate a JWT token
    const token = jwt.sign({ userId: user.User_id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the token
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
