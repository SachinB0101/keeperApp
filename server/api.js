import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import bodyParser from "body-parser"
import bcrypt from "bcrypt";

import noteSchema from "./models/Note.js";
import User from "./models/User.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://sachinbhatt0101:helloWorld1234@cluster0.lkuhxgj.mongodb.net/keeperAppDB");

const date = new Date();

app.get("/api", (req, res) => {
    res.send("Hello World");
});

app.post("/api/addUser", async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const fName = req.body.fName;
        const lName = req.body.lName;
        const email = req.body.email;

        const newUser = new User({
            firstName: fName,
            lastName: lName,
            email: email,
            password: hashedPassword,
            notes: []
        });
        await newUser.save();

        res.sendStatus(200);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
});


app.post("/api/checkUser", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const result = await User.find({
        email: email,
        password: password
    });

    if(result.length === 1){
        res.sendStatus(200);
    }else{
        res.sendStatus(400);
    }
});

app.get("/api/checkEmail", async (req, res) => {
    const result = await User.find({email: req.query.email});

    if(result.length === 0){
        res.sendStatus(200);
    }else{
        res.sendStatus(409);
    }
});


app.listen(5001, () => {
    console.log("server started on 5001...");
});