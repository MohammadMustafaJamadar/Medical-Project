import { signUpValidation } from "../utils/validation.js";
import { successFull, failed } from "../utils/validationDetails.js";

const registrationFunction = async (req, res) => {
  try {
    const username = req.body.name;
    const userpassword = req.body.password;
    const userEmailOrNumber = req.body.emailOrNumber;
    const result = await signUpValidation(
      username,
      userpassword,
      userEmailOrNumber
    );
  
    if (result === failed.emptyInputs) {
      res.send({massage:failed.emptyInputs, variant:"danger"})
    } else if (result === failed.emailOrnumberFailed) {
      res.send({massage:failed.emailOrnumberFailed, variant:"danger"})
    } else if (result === failed.passwordFailed) {
      res.send({massage:failed.passwordFailed, variant:"danger"})
    } else {
      res.send({massage:successFull.login,variant:"success"})
    }
  } catch (error) {
    if (error) throw error;
  }
};

export { registrationFunction };
