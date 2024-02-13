import { Router } from "express";
import { allUsers } from "../Controllers/User.contollers";

const userRouter = Router();

userRouter.get("/allusers", allUsers);

export default userRouter;
