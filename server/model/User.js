import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstName: String,
    secondName: String,
    email: String,
    password: String
});

export default model("User", userSchema);