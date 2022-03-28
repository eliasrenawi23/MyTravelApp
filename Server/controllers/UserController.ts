
import User from "../model/userModel";
import jwt from "jwt-simple";
import mongoose from "mongoose";
const bcrypt = require('bcrypt');
var crypto = require("crypto");
const saltRounds = 10;
//const express = require("express");
//var fs = require("fs");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);



exports.login = async (req, res) => {
  console.log("login");
  console.log(req.body);
  const { Email, Lname, Fname, Password, Id, ProfileImg, token } = req.body;
  const email=Email.toLowerCase();
  if (req.body.token) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    res.status(201);
    console.log("ticket.getPayload()",ticket.getPayload());
  }
  try {
    const { publicuser } = req.cookies;
    var decoded = jwt.decode(publicuser,  process.env.JWT_SECRET);
    const { userId } = decoded;
    console.log("publicuser is decoded :  ", decoded);
    const _user = await User.findOne({ Email: email });
    console.log(_user);
    if (_user === null && Password === "googlepassword") {//if google user just add it 
      const _user = new User({
        Email: email,
        FisrtName: Fname,
        LastName: Lname,
        imageUrl: ProfileImg,
        _id: new mongoose.Types.ObjectId(userId.toString()),
        password: "googlepassword",
        role: "user"
      })
      _user.save().then("Users saved!");
      const encodedJWT = jwt.encode({ userId: _user._id, isLogedin: true },  process.env.JWT_SECRET);
      res.clearCookie('publicuser');
      res.cookie("userLogin", encodedJWT);
      res.send({ ok: true, Users: _user });
    }
    else {   //if not google user check the password
      if (_user === null) {
        console.log("not user");
        res.send({ ok: false, Users: null }); //the user is not database 
      }
      else if (await bcrypt.compare(Password, _user.password)) {  ///to be contenuo
        console.log({ userId: _user._id ,JWT_SECRET:process.env.JWT_SECRET});

        const encodedJWT = jwt.encode({ userId: _user._id, isLogedin: true }, process.env.JWT_SECRET);
        res.clearCookie('publicuser');
        res.cookie("userLogin", encodedJWT);
        res.status(200).send({
          ok: true, Users: {
            Email: _user.Email,
            Fname: _user.FisrtName,
            Lname: _user.LastName,
            ProfileImg: _user.ProfileImg,
            Id: _user._id,
            password: "",
            role: "user"
          }
        });
      }
      else {
        const validPass = await bcrypt.compare(Password, _user.password);
        console.log("_user.password === Password ", _user.password, " ", Password, validPass)
        res.send({ ok: false, Users: null }); //the user in data bas but wrong password

      }
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).send({ ok: false, error: error.message });
  }
};
exports.logout = async (req, res) => {
  console.log("logout");
  res.clearCookie('userLogin');
  res.status(204).send({ ok: true })
};



exports.Signup = async (req, res) => {
  console.log("Signup");
  console.log(req.body);

  const { Email, Lname, Fname, Password, Id, ProfileImg } = req.body;
  const email=Email.toLowerCase();

  const { publicuser } = req.cookies;
  var decoded = jwt.decode(publicuser,  process.env.JWT_SECRET);
  const { userId } = decoded;
  var newId: string =userId;

  try {
    const hash = await bcrypt.hash(Password, 10);
    const _user = await User.findOne({ Email: email });
    if (_user != null) res.status(400).send({ ok: false, error: "user already in database" });
    else {
      //var newId: string = Math.floor(Math.random() * 1000000000000000000000).toString();
      const _user = new User({
        Email: email,
        FisrtName: Fname,
        LastName: Lname,
        imageUrl: ProfileImg,
        Id: newId,
        password: hash,
        role: "user"

      })
      _user.save().then("Users saved!");

      const encodedJWT = jwt.encode({ userId: newId, isLogedin: true },  process.env.JWT_SECRET);
      res.cookie("userLogin", encodedJWT);
      res.status(200).send({ ok: true, Users: _user });
    }
  } catch (error: any) {
    res.status(400).send({ ok: false, error: error.message });
  }
};


export function isUserLoggedIn(req, res, next) {


  try {
    console.log("req.cookies",req.cookies);
    const { userLogin } = req.cookies;
    if (!userLogin) {
      console.log("checkd if looged in but noo cooke");
      var newId:string = crypto.randomBytes(12).toString('hex');
      const encodedJWT = jwt.encode({ userId: newId, isLogedin: false },  process.env.JWT_SECRET);
     
      res.cookie("publicuser", encodedJWT);
      res.status(200).send({ ok: true, newIdencoded: encodedJWT });
    } else {
      console.log("checkd if looged in and went to next function");
      next();
    }
  } catch (err:any){
    console.error(err)
    res.send({ error: err.message });
  }
}
// to do

// router.get('/get-user-recipes', async (req, res) => {
//   try {
//       const {userLogIn} = req.cookies;
//       const {id} = userLogIn;
//       const user = await User.findOne({_id: id})
//       if(user){
//           const recipes = await userRecipes.find({});
//           res.send({ok:true, recipes: recipes});
//       }
//       else{
//           res.send({ok: false});
//       }
//   } catch (error: any) {
//       res.send({ ok:false, error: error.message });
//   }
// })
