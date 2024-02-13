import express, { NextFunction, Request, Response, json } from 'express'
import LoginRouter from './Routers/login.router'
import projectRouter from './Routers/project.router'

const app = express()

app.use(json())


app.use((err:Error, req: Request, res: Response, next: NextFunction)=>{
  res.status(500).json({
    err
  })
})

// Import routes
app.use('/user',LoginRouter);
app.use('/projects', projectRouter)
const PORT = 3002

app.listen(PORT, ()=>{
  console.log(`Listening on ${PORT}`);
  
})