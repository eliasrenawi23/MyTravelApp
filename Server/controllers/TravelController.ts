import User from "../model/userModel";
const JWT_SECRET = process.env.JWT_SECRET;
import jwt from "jwt-simple";


exports.AddNewTravel = async (req, res) => {
    console.log("AddNewTravel");
    console.log(req.body);

    try {
        console.log(req.cookies);
        const { userLogin } = req.cookies;
        //const { id } = userLogIn;

        var decoded = jwt.decode(userLogin, JWT_SECRET);
        const{userId}=decoded;
        console.log("userLogIn is decoded :  " ,decoded); 
        const _user = await User.findOne({_id: userId });
        console.log(_user); 



    } catch (error: any) {
        console.error(error);
        //res.status(400).send({ ok: false, error: error.message });
    }
};
exports.getTravelData = async (req, res) => {
    console.log("getTravelData");
    console.log(req.body);

    try {


    } catch (error: any) {
        res.status(400).send({ ok: false, error: error.message });
    }
};

exports.getAllTravels = async (req, res) => {
    console.log("getAllTravels");
    console.log(req.body);

    try {


    } catch (error: any) {
        res.status(400).send({ ok: false, error: error.message });
    }
};






