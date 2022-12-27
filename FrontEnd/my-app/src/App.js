import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/page/Login";
import Homepage from "./components/page/Homepage";
import SignUp from "./components/page/SignUp";
import User from "./components/page/User";
import NavBar from "./components/page/NavBar";
import axios from 'axios';
import { useEffect } from "react";

function App() {

  // useEffect(()=>{
  //   axios.post("").then((res)=>{}).catch((err)=>{
  //     if(err) throw err;
  //   })
  // },[])

  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route element={<Homepage />} path="/"></Route>
          <Route element={<SignUp />} path="/signup"></Route>
          <Route element={<Login />} path="/login"></Route>

          <Route element={<User />} path="/user"></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
