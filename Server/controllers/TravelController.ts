import User from "../model/userModel";
const JWT_SECRET = process.env.JWT_SECRET;
import jwt from "jwt-simple";
import Travel from "../model/travelModel";
import Category from "../model/CategoryModel";
import Item from "../model/ItmesModel";


exports.AddNewTravel = async (req, res) => {
    console.log("AddNewTravel");
    console.log(req.body);
    try {
        const { travelDateFrom, travelDateTo, travelDest,
            numberOfPeople, travelPurpos, Luggage, Transport,
            Activity, Accommodation, Spiceal } = req.body.NewTravelInfo
        console.log(req.cookies);
        const { userLogin } = req.cookies;
        var decoded = jwt.decode(userLogin, JWT_SECRET);
        const { userId } = decoded;
        console.log("userLogIn is decoded :  ", decoded);
        const _user = await User.findOne({ _id: userId });
        console.log(_user);

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
            travelDateFrom: travelDateFrom,
            travelDateTo: travelDateTo,
            travelDest: travelDest,
            numberOfPeople: numberOfPeople,
            travelPurpos: ["Swim", "eat"],
            Luggage: ["back bag", "sutie"],
            Listofcat: arreyofCategory,
            user: _user
        })




    } catch (error: any) {
        console.error(error);
        res.status(400).send({ ok: false, error: error.message });
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






