import express from "express";
const app = express();
import dotenv from "dotenv";
import Cors from "cors";
import {
  registrationFunction,
  loginFunction,
  authenticationUser,
  loginedUser,
  logOutFunction,
  uploadImageSingle,
  uploadImage,
} from "./controller/callbackFunctions.js";
import "./src/connection/connection.js";
import cookieParser from "cookie-parser";

dotenv.config();
const port = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(Cors(corsOptions)); //cors ka istemal karre ine post req aye tu isko leta
app.use(cookieParser());
app.use(express.json()); //javascript ko batare ke jason files ko use kar
app.use(express.urlencoded({ extended: false }));

app.post("/");
app.post("/signup", registrationFunction);
app.post("/login", loginFunction);
app.post("/user", authenticationUser, loginedUser);
app.post("/logout", logOutFunction);
app.post("/image",uploadImageSingle,uploadImage)

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
