import Mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecretCode = process.env.JWT_SECRET_CODE;

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
  userEmail: {
    type: String,
    unique: true,
  },
  userNumber: {
    type: String,
    unique: true,
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
  userImage:{
    type:String,
  },
  userTokes: [
    {
      userToken: {
        type: String,
        required: true,
      },
    },
  ],
});

newUser.methods.generateTokens = async function () {
  //token ko generate kiya jara
  try {
    let token = jwt.sign({ _id: this._id }, `${jwtSecretCode}`);

    this.userTokes = this.userTokes.concat({ userToken: token });
    this.save();
    return token;
  } catch (error) {
    throw error;
  }
};

const UserData = Mongoose.model("userInfo", newUser);

export default UserData;
