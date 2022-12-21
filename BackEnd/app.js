import express, { urlencoded } from "express";
const app = express();
import cors from "cors";
import { registrationFunction } from "./controller/callbackFunctions.js";

const port = 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post("/");
app.post("/signup",registrationFunction);
app.post("/login");


app.listen(port,()=>{
  console.log(`server running on ${port}`)
})