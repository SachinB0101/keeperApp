import mongoose from "mongoose";
import { Schema, model } from "mongoose";

import Note from "./Note.js";

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    notes: [Note.schema]
});

export default model("User", userSchema);