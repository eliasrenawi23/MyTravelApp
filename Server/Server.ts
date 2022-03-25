const express = require('express');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const http = require('http');
const cors = require('cors');

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
    res.send('Hello World!');
});

const userRouter = require('./routers/userRouter');
app.use('/users', userRouter);

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '../my-app/build.index.html');
});
app.listen(port, () => {
    return console.log(`Listening on port ${port}!`);
});