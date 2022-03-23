const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const{OAuth2Client} =require('google-auth-library');


app.use(express.json());
app.use(cors())
require('dotenv').config();

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

app.listen(port, () => {
    return console.log(`Listening on port ${port} !`);
});