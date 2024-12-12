import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import path from "path";
import notFoundHandler from './app/utils/notFoundHandler';
import errorHandler from './app/utils/errorHandler';

const app: Application = express();
//parsers
app.use(express.json());
app.use(cors());


// Serve static files
// const staticPath = path.join(__dirname, "../uploads");
// app.use("./app/uploads", express.static(staticPath));

// route
app.get('/',(req:Request,res:Response)=>{
  res.send("Hello world")

})
// route handel 
app.use('/api/v1', router)

app.use(notFoundHandler);
app.use(errorHandler);




export default app;
