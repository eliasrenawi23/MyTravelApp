
import User from "../model/userModel";
//const express = require("express");
//var fs = require("fs");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);



exports.login = async (req, res) => {
  console.log("login");
  console.log(req.body);
  // const {token}=req.body;
  // const ticket =await client.verifyIdToken({
  //   idToken:token,
  //   audience:process.env.CLIENT_ID,
  // });
  // const{name,email,picture}=ticket.getPayload();
  // console.log(ticket.getPayload());
  const { Email, Lname, Fname, Password, Id, ProfileImg } = req.body;

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
      res.cookie("userLogin",{id:_user.Id});
      res.send({ ok: true, Users: _user });
    }
    else {   //if not google user check the password
      if (_user === null) {
        res.send({ ok: false, Users: null }); //the user is not database 
      }
      else if (_user.password === Password) {  ///to be contenuo
        //res.cookie('mycookies',_user,{ maxAge: 900000, httpOnly: true })
        //res.cookie("userLogin",{id:_user.Id});
        console.log("cookie :", res.cookie("userLogin",{id:_user.Id},{ path: '/login' }));
        res.status(200).send({ ok: true, Users: _user });
      }
      else {
        res.send({ ok: false, Users: null }); //the user in data bas but wrong password
      }
    }
  } catch (error: any) {
    res.send({ ok: false, error: error.message });
  }
};
