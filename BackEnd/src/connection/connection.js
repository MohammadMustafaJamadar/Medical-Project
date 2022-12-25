import Mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const localHost = process.env.HOST;
const collection = process.env.COLLECTION;

Mongoose.connect(`mongodb://${localHost}/${collection}`)
  .then(() => {
    console.log("Connection created!");
  })
  .catch((err) => {
    if (err) throw err;
  });
