import express from "express";
import mongoose from "mongoose";

import Note from "./model/Note.js";
import User from "./model/User.js";

mongoose.connect("mongodb+srv://sachinbhatt0101:helloWorld1234@cluster0.lkuhxgj.mongodb.net/");

const app = express();

app.get("/api", (req, res) => {
    res.send("Hello World");
});

app.listen(5001, () => {
    console.log("server started on 5001...");
});