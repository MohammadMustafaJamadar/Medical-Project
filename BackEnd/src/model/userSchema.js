import Mongoose from "mongoose";
import validator from "validator";

const { Schema } = Mongoose;

const newUser = new Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmailOrNum: {
    type: String,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value) && !validator.isMobilePhone(value)) {
        throw Error;
      }
    },
  },
  userPassword: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw Error;
      }
    },
  },
});

const UserData = Mongoose.model("userInfo", newUser);

export default UserData;
