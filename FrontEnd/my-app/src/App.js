import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/page/Login";
import Homepage from "./components/page/Homepage";
import SignUp from "./components/page/SignUp";
import User from "./components/page/User";
import NavBar from "./components/page/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookie from "universal-cookie";
import Edituserinfo from "./components/page/Edituserinfo";

const cookies = new Cookie();

const fethcingUserData = async () => {
  try {
    return await axios.post("http://localhost:9000/user", {
      withCredentials: true, //backend se jo cookies save kiye jare unko lere 
    });
  } catch (error) {
    throw error;
  }
};

function App() {
  const [userDetails, setUserDetails] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState();

  useEffect(() => {
    const token = cookies.get("userData"); //token ko cookie se get karre
    if (token) {
      fethcingUserData()
        .then(async (res) => {
          const userInfo = await res.data; //backend se user ka data lere
          setUserDetails(userInfo); //yaha per user ka data set karre
          setIsUserLoggedIn(true); //iske saath saath user loggedin set karre ke user login hogaya
        })
        .catch((err) => {
          if (err) throw err;
        });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(userDetails).length > 0) {
      //user ka login status set karre
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [userDetails]);

  return (
    <>
      <Router>
        <NavBar isUserLoggedIn={isUserLoggedIn} setUserDetails={setUserDetails} />
        <Routes>
          <Route element={<Homepage />} path="/"></Route>
          <Route
            element={<SignUp isUserLoggedIn={isUserLoggedIn} />}
            path="/signup"
          ></Route>
          <Route
            element={<Login isUserLoggedIn={isUserLoggedIn} setUserDetails={setUserDetails} />}
            path="/login"
          ></Route>

          <Route
            element={
              isUserLoggedIn ? (
                <User userDetails={userDetails} />
              ) : (
                <Login isUserLoggedIn={isUserLoggedIn} setUserDetails={setUserDetails} />
              )
            }
            path="/user"
          ></Route>
          <Route element={
            <Edituserinfo/>
          } path="/edituserinfo"></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
