import validator from "validator";
import { successFull, failed } from "./validationDetails.js";

const signUpValidation = async (username, userpassword, userEmailOrNumber) => {
  try {
    if (
      username === "" ||
      (username === null && userEmailOrNumber === "") ||
      (userEmailOrNumber === null && userpassword === "") ||
      userpassword === null
    ) {
      return failed.emptyInputs;
    } else if (
      !validator.isEmail(userEmailOrNumber) &&
      !validator.isMobilePhone(userEmailOrNumber)
    ) {
      return failed.emailOrnumberFailed;
    } else if (!validator.isStrongPassword(userpassword)) {
      return failed.passwordFailed;
    } else {
      return successFull;
    }
  } catch (error) {
    if (error) throw error;
  }
};

const loginValidation = async (userEmailOrNumber, userpassword) => {
  if (
    userEmailOrNumber === "" ||
    (userEmailOrNumber === null && userpassword === "") ||
    userpassword === null
  ) {
    return failed.emptyInputs;
  } else {
    return successFull;
  }
};

export { signUpValidation, loginValidation };
