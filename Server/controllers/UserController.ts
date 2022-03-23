
import user from "../model/userModel";
var fs = require("fs");
const{OAuth2Client} =require('google-auth-library');
const client =new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);


exports.login = async (req, res) => {
  console.log("login");

  const {token}=req.body;
  const ticket =await client.verifyIdToken({
    idToken:token,
    audience:process.env.CLIENT_ID,
  });
  const{name,email,picture}=ticket.getPayload();
  try {
    const _user = await user.find({});
    res.send({ ok: true, user: _user });
  } catch (error: any) {
    res.send({ ok: false, error: error.message });
  }
};

// exports.addNewAccident = async (req, res) => {
//   console.log("addNewAccident 1");
//   const {
//     type,
//     emergency,
//     date,
//     address,
//     media,
//     call,
//     description,
//     user,
//     org,
//   } = req.body;

//   try {

//     const _acc = await new Accident({

//       type: type,
//       emergency: emergency,
//       date: date,
//       address: address,
//       description: description,
//       media: media,
//       user: user,
//       org: org,
//     });
//     _acc.save().then("accident saved!");
//     res.send({accident:_acc})

//     // const _acc = await Accident.findOne({ });
//   } catch (error: any) {
//     console.log("error 2");
//     console.log(error);
//     res.send({ ok: false, error: error.message });
//   }
// };
