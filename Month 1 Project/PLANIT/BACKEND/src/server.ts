import express, { NextFunction, Request, Response, json } from "express";
import LoginRouter from "./Routers/login.router";
import projectRouter from "./Routers/project.router";
import userRouter from "./Routers/user.router";
import cors from "cors";

const app = express();

app.use(json());
app.use(cors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    err,
  });
});

// Import routes
app.use("/user", LoginRouter);
app.use("/users", userRouter);
app.use("/projects", projectRouter);
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
