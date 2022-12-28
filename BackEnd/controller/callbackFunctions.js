import { signUpValidation, loginValidation } from "../utils/validation.js";
import { successFull, failed, variant } from "../utils/validationDetails.js";
import UserData from "../src/model/userSchema.js";
import Jwt  from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const jwtSecretCode = process.env.JWT_SECRET_CODE

const registrationFunction = async (req, res) => {
  try {
    //user se data lere
    const username = req.body.name;
    const userpassword = req.body.password;
    const userEmailOrNumber = req.body.emailOrNumber;
    const result = await signUpValidation(
      username,
      userpassword,
      userEmailOrNumber
    ); //validation ko values bhejre

    //yaha validation hora
    if (result === failed.emptyInputs) {
      res.send({ massage: failed.emptyInputs, variant: variant.danger });
    } else if (result === failed.emailOrnumberFailed) {
      res.send({
        massage: failed.emailOrnumberFailed,
        variant: variant.danger,
      });
    } else if (result === failed.passwordFailed) {
      res.send({ massage: failed.passwordFailed, variant: variant.danger });
    } else {
      //user ke email ya number se usko find karre agar hai tu already exsits bolre nhi tu signUp kare
      UserData.findOne(
        { userEmailOrNum: userEmailOrNumber },
        async (err, userDetails) => {
          if (userDetails) {
            res.send({
              massage: failed.alreadyExist,
              variant: variant.success,
            });
          } else {
            //yaha per signup hora
            const addNewUser = new UserData({
              userName: username,
              userEmailOrNum: userEmailOrNumber,
              userPassword: userpassword,
            });
            await addNewUser.save();

            res.send({
              massage: successFull.login,
              variant: variant.success,
              userDetails: addNewUser,
            });
          }
        }
      );
    }
  } catch (error) {
    if (error) throw error;
  }
};

const loginFunction = async (req, res) => {
  try {
    //login keleye data lere
    const userEmailOrNum = req.body.emailOrNumber;
    const userPassword = req.body.password;
    const result = await loginValidation(userEmailOrNum, userPassword);
    if (result === failed.emptyInputs) {
      res.send({ massage: failed.emptyInputs, variant: variant.danger });
    } else {
      //user ko login karare
      const loginUser = await UserData.findOne({
        userEmailOrNum: userEmailOrNum,
      });

      if (userPassword === loginUser.userPassword) {
        let token = await loginUser.generateTokens() //user ka token create kiya jara
        res.status(200).cookie("userData", token , {path : "/"}) //yaha per token ko cookie me set karre
        res.send({
          massage: successFull.logined,
          userDetails: loginUser,
          variant: variant.success,
        });
      } else {
        res.send({ massage: failed.emailOrPassFail, variant: variant.danger });
      }
    }
  } catch (error) {
    if (error) throw error;
  }
};

const authenticationUser = async (req,res,next)=>{

try {

  const token = req.cookies.userData //cookie se token lere
  const verify_User = Jwt.verify( //yaha per wo token ko jwt ke madad se verify karre
    token,
   `${jwtSecretCode}`
  )

  const userInfo = await UserData.findOne({//verify karne ke baad yaha per user detail lere
    _id : verify_User._id,
    'userTokes:userToken' : token
  })


    if(!userInfo){
      throw new Error("User nor found!");
    }else{
      req.token = token, //token ko req me dalre karre
      req.userInfo = userInfo //user ke details ko req me dalre karre
      next();
    }

  
  
} catch (error) {
  res.status(404).send(failed.userLoginedFail)
  throw error;
}

}

const loginedUser = (req,res)=>{

  res.send(req.userInfo);

}

const logOutFunction = (req,res)=>{
  
  res.clearCookie("userData", {path:"/"})
  res.send("Cookie Cleared!")

}

export { registrationFunction, loginFunction, authenticationUser, loginedUser, logOutFunction };
