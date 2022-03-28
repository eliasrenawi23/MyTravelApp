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
        var decoded = jwt.decode(userLogin, process.env.JWT_SECRET);
        const { userId } = decoded;
        console.log("userLogIn is decoded :  ", decoded);
        const _user = await User.findOne({ _id: userId });
        console.log(_user);

        const Passport = await new Item({
            name: 'passport',
            quantity: 1
        })
        const Mobile = await new Item({
            name: 'Mobile',
            quantity: 1
        })
        const Wallet = await new Item({
            name: 'Wallet',
            quantity: 1
        })
        const Coins = await new Item({
            name: 'Coins',
            quantity: 1
        })

        const arreyofitemEssentials: typeof Item[] = [];
        arreyofitemEssentials.push(Passport);
        arreyofitemEssentials.push(Mobile);
        arreyofitemEssentials.push(Wallet);
        arreyofitemEssentials.push(Coins);

        //console.log(arreyofitem);

        const Essentials = await new Category({
            CategoryName: "Essentials",
            list: arreyofitemEssentials
        })

        const Shirt = await new Item({
            name: 'Shirt',
            quantity: 6
        })
        const Pants = await new Item({
            name: 'Pants',
            quantity: 3
        })
        const Underware = await new Item({
            name: 'Underware',
            quantity: 6
        })
        const arreyofitemClothes: typeof Item[] = [];
        arreyofitemClothes.push(Shirt);
        arreyofitemClothes.push(Pants);
        arreyofitemClothes.push(Underware);

        const Clothes = await new Category({
            CategoryName: "Clothes",
            list: arreyofitemClothes
        })
        const Conditioner = await new Item({
            name: 'Conditioner',
            quantity: 1
        })
        const Shampoo = await new Item({
            name: 'Shampoo',
            quantity: 1
        })
        const Soap = await new Item({
            name: 'Soap',
            quantity: 1
        })
        const ToothPaser = await new Item({
            name: 'Tooth Paser & brush',
            quantity: 1
        })

        const arreyofitemCare: typeof Item[] = [];
        arreyofitemClothes.push(ToothPaser);
        arreyofitemClothes.push(Soap);
        arreyofitemClothes.push(Shampoo);
        arreyofitemClothes.push(Conditioner);

        const Care = await new Category({
            CategoryName: "Care",
            list: arreyofitemCare
        })

        const Shoes = await new Item({
            name: 'Shoes',
            quantity: 1
        })
        const PhoneCharger = await new Item({
            name: 'Phone Charger',
            quantity: 1
        })
        const Earphones = await new Item({
            name: 'Earphones',
            quantity: 1
        })
        const Catcage = await new Item({
            name: 'Cat cage',
            quantity: 1
        })

        const arreyofitemAccessories: typeof Item[] = [];
        arreyofitemAccessories.push(Shoes);
        arreyofitemAccessories.push(PhoneCharger);
        arreyofitemAccessories.push(Earphones);
        arreyofitemAccessories.push(Catcage);

        const Accessories = await new Category({
            CategoryName: "Accessories",
            list: arreyofitemAccessories
        })

        const arreyofCategory: typeof Category[] = [];
        arreyofCategory.push(Essentials);
        arreyofCategory.push(Clothes);
        arreyofCategory.push(Care);
        arreyofCategory.push(Accessories);
        //console.log(arreyofCategory);


        const _travel = new Travel({
            travelDateFrom: travelDateFrom,
            travelDateTo: travelDateTo,
            travelDest: travelDest,
            numberOfPeople: numberOfPeople,
            travelPurpos: travelPurpos,
            Luggage: Luggage,
            Accommodation: Accommodation,
            Activity: Activity,
            Spiceal: Spiceal,
            Transport: Transport,
            Listofcat: arreyofCategory,
            user: _user
        })

        _travel.save().then("_travel saved!");

        console.log(_travel)


    } catch (error: any) {
        console.error(error);
        res.status(400).send({ ok: false, error: error.message });
    }
};
exports.getAllTravelsData = async (req, res) => {
    console.log("getTravelData");
    console.log(req.body);



    try {
        console.log(req.cookies);
        const { userLogin,publicuser } = req.cookies;
        var cooki:any;
        if(!publicuser){
        cooki=userLogin;
        }
        else{
        cooki=publicuser;
        }
        var decoded = jwt.decode(cooki, process.env.JWT_SECRET);
        const { userId } = decoded;
        console.log("userLogIn is decoded :  ", decoded);
        const _user = await User.findOne({ _id: userId });
        console.log(_user);

        const _travelList= await Travel.find({ user: _user}).exec();
        console.log(_travelList);

        res.send({ ok: true, travelList: _travelList });

    } catch (error: any) {
        console.error(error);
        res.status(400).send({ ok: false, error: error.message });
    }
};

exports.getAllTravels = async (req, res) => {
    console.log("getAllTravels");
    console.log(req.body);

    try {
        res.status(400).send({ ok: true, msg: "all good to go" });


    } catch (error: any) {
        res.status(400).send({ ok: false, error: error.message });
    }
};






