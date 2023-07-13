import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import bodyParser from "body-parser"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import noteSchema from "./models/Note.js";
import User from "./models/User.js";

const app = express();

app.use(express.json())
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/home", authenticateToken);

await mongoose.connect("mongodb+srv://sachinbhatt0101:helloWorld1234@cluster0.lkuhxgj.mongodb.net/keeperAppDB");

const date = new Date();

app.get("/api", (req, res) => {
    res.send("Hello World");
});

app.get("/api/home", authenticateToken, async (req, res) => {
    const user = await User.find({email: req.user.email});
    // console.log(user[0].notes);
    res.status(200).send(user[0].notes);
});  

app.post("/api/addNote", authenticateToken, async (req, res) => {
    const user = await User.find({email: req.user.email});
    const newNote = {
        title: req.body.title,
        content: req.body.content
    }
    user[0].notes.push(newNote);
    await user[0].save();

    const data = await User.find({email: req.user.email});
    res.sendStatus(200);
})

app.post("/api/deleteNote", authenticateToken, async (req, res) => {
    const user = await User.find({email: req.user.email});

    user[0].notes.splice(req.body.id, 1);

    await user[0].save();

    res.sendStatus(200);
    
});

function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

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


app.post("/api/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const result = await User.find({
        email: email
    });

    if(result.length === 0){
        return res.status(400).send("Cannot find user");
    }

    try{
        if(await bcrypt.compare(req.body.password, result[0].password)){
            const accessToken = jwt.sign({email: result[0].email}, process.env.ACCESS_TOKEN_SECRET);
            return res.status(200).json({accessToken: accessToken});
        }else{
            res.status(405).send("Not Allowed");
        }
    }catch(error){
        console.log(error);
        res.status(500).send();
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