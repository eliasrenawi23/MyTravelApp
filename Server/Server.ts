import { isUserLoggedIn } from "./controllers/UserController";
import Category from "./model/CategoryModel";
import Item from "./model/ItmesModel";
import Travel from "./model/travelModel";
import User from "./model/userModel";

const express = require('express');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const http = require('http');
const cors = require('cors');
const jwt = require('jwt-simple');
var crypto = require("crypto");


const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;


const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],

};
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions))
require('dotenv').config();
app.use(express.static("../my-app/build"));

mongoose.connect(`mongodb+srv://eliasrenawi:${process.env.MONGODB_PASSWORD}@cluster0.yp2sn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("connected to DB!");
});

app.get('/', (req, res) => {
    var newId:string = crypto.randomBytes(12).toString('hex');
    //var newId: string = Math.floor(Math.random() * 1000000000000000000000000).toString();
    const encodedJWT = jwt.encode({ userId: newId, isLogedin: false },  process.env.JWT_SECRET);
    res.cookie("publicuser", encodedJWT);
    res.status(200).send({ ok: true, newIdencoded: encodedJWT });
    res.send('Hello World!');
});



const userRouter = require('./routers/userRouter');
app.use('/users', userRouter);

app.use(isUserLoggedIn);

const travelRouter = require('./routers/travelRouter');
app.use('/travel', travelRouter);

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '../my-app/build.index.html');

});

async function savedate() {
    try {
        //save images
        const _user = await User.findOne({ Email: "eliasrenawi23@gmail.com" });

        const item = await new Item({
            name: 'passport',
            quantity: 1
        })
        const arreyofitem: typeof Item[] = [];
        arreyofitem.push(item);

        //console.log(arreyofitem);

        const cat = await new Category({
            CategoryName: "Essentials",
            list: arreyofitem
        })
        const cat2 = await new Category({
            CategoryName: "Essentials2",
            list: arreyofitem
        })
        const arreyofCategory: typeof Category[] = [];
        arreyofCategory.push(cat);
        arreyofCategory.push(cat2);
        //console.log(arreyofCategory);

        var date = new Date()

        const _travel = new Travel({
            travelDateFrom: date,
            travelDateTo: date,
            travelDest: "london",
            numberOfPeople: 0,
            travelPurpos: ["Swim", "eat"],
            Luggage: ["back bag", "sutie"],
            Listofcat: arreyofCategory,
            user: _user
        })

        console.log(_travel);


        // _acc.save().then("accident saved!");
        // res.send({accident:_acc})

        // const _acc = await Accident.findOne({ });
    } catch (error: any) {
        console.log("error 2");
        console.log(error);
        // res.send({ ok: false, error: error.message });
    }

}
//savedate();

app.listen(port, () => {
    return console.log(`Listening on port ${port}!`);
});