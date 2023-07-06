import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const noteSchema = new Schema({
    title: String,
    content: String,
    createdAt: Date,
    updatedAt: Date
});

export default model("Note", noteSchema);