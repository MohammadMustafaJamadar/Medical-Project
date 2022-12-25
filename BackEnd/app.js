import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import { registrationFunction, loginFunction } from "./controller/callbackFunctions.js";
import "./src/connection/connection.js";

dotenv.config();
const port = process.env.PORT;

app.use(cors()); //cors ka istemal karre ine post req aye tu isko leta
app.use(express.json()); //javascript ko batare ke jason files ko use kar
app.use(express.urlencoded({ extended: false }));

app.post("/");
app.post("/signup", registrationFunction);
app.post("/login", loginFunction);

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
