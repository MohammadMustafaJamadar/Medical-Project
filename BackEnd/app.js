import express, { urlencoded } from "express";
const app = express();
import cors from "cors";
import { registrationFunction } from "./controller/callbackFunctions.js";

const port = 9000;

app.use(cors()); //cors ka istemal karre ine post req aye tu isko leta
app.use(express.json()); //javascript ko batare ke jason files ko use kar
app.use(express.urlencoded({extended:false}));

app.post("/");
app.post("/signup",registrationFunction);
app.post("/login");


app.listen(port,()=>{
  console.log(`server running on ${port}`)
})