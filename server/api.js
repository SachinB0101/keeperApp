import express from "express";
import mongoose from "mongoose";

import noteSchema from "./models/Note.js";
import User from "./models/User.js";

mongoose.connect("mongodb+srv://sachinbhatt0101:helloWorld1234@cluster0.lkuhxgj.mongodb.net/keeperAppDB");

const date = new Date();

await User.deleteOne({firstName: "Sachin"});


const app = express();

app.get("/api", (req, res) => {
    res.send("Hello World");
});

app.listen(5001, () => {
    console.log("server started on 5001...");
});