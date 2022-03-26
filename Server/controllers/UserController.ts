
import User from "../model/userModel";
import jwt from "jwt-simple";
const bcrypt = require('bcrypt');
const saltRounds = 10;
//const express = require("express");
//var fs = require("fs");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET;



exports.login = async (req, res) => {
  console.log("login");
  console.log(req.body);
  const { Email, Lname, Fname, Password, Id, ProfileImg, token } = req.body;
  if (req.body.token) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    res.status(201);
    console.log(ticket.getPayload());
  }
  var newId: string;
  try {
    const _user = await User.findOne({ Email: Email });
    console.log(_user);
    if (_user === null && Password === '') {//if google user just add it 
      if (Id === '')
        newId = Math.floor(Math.random() * 1000000000000000000000).toString();
      else {
        newId = Id.toString();
      }
      console.log(newId);
      const _user = new User({
        Email: Email,
        FisrtName: Fname,
        LastName: Lname,
        imageUrl: ProfileImg,
        Id: newId,
        password: ""
      })
      _user.save().then("Users saved!");
      const encodedJWT = jwt.encode({ userId: newId }, JWT_SECRET);
      res.cookie("userLogin", encodedJWT);
      res.send({ ok: true, Users: _user });
    }
    else {   //if not google user check the password
      if (_user === null) {
        console.log("not user");
        res.send({ ok: false, Users: null }); //the user is not database 
      }
      else if (await bcrypt.compare(Password, _user.password)) {  ///to be contenuo
        const validPass=await bcrypt.compare(_user.password,Password);
        const encodedJWT = jwt.encode({ userId: newId, isLogedin: true }, JWT_SECRET);
        res.cookie("userLogin", encodedJWT);
        // console.log("cookie :", res.cookie("userLogin",{id:_user.Id},{ path: '/login' }));
        res.status(200).send({
          ok: true, Users: {
            Email: _user.Email,
            Fname: _user.FisrtName,
            Lname: _user.LastName,
            ProfileImg: _user.ProfileImg,
            Id: _user._id,
            password: ""
          }
        });
      }
      else {
        const validPass=await bcrypt.compare(Password, _user.password);
        console.log("_user.password === Password ", _user.password, " ", Password,validPass)
        res.send({ ok: false, Users: null }); //the user in data bas but wrong password

      }
    }
  } catch (error: any) {
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

  var newId: string;

  try {
    const hash =await bcrypt.hash(Password,10);
    const _user = await User.findOne({ Email: Email });
    if (_user != null) res.status(400).send({ ok: false, error: "user already in database" });
    else {
      var newId: string = Math.floor(Math.random() * 1000000000000000000000).toString();
      const _user = new User({
        Email: Email,
        FisrtName: Fname,
        LastName: Lname,
        imageUrl: ProfileImg,
        Id: newId,
        password: hash
      })
      _user.save().then("Users saved!");

      const encodedJWT = jwt.encode({ userId: newId, isLogedin: true }, JWT_SECRET);
      res.cookie("userLogin", encodedJWT);
      res.status(200).send({ ok: true, Users: _user });
    }
  } catch (error: any) {
    res.status(400).send({ ok: false, error: error.message });
  }
};
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
