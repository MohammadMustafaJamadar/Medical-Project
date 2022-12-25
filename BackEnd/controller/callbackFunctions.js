import { signUpValidation, loginValidation } from "../utils/validation.js";
import { successFull, failed, variant } from "../utils/validationDetails.js";
import UserData from "../src/model/userSchema.js";

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
          if(userDetails){
            res.send({massage:failed.alreadyExist, variant:variant.success})
          }else{
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
      const loginUser = await UserData.find({
        userEmailOrNum: userEmailOrNum,
        userPassword: userPassword,
      });

      if (loginUser.length === 0) {
        res.send({ massage: failed.emailOrPassFail, variant: variant.danger });
      } else {
        res.send({
          massage: successFull.logined,
          userDetails: loginUser,
          variant: variant.success,
        });
      }
    }
  } catch (error) {
    if (error) throw error;
  }
};

export { registrationFunction, loginFunction };
