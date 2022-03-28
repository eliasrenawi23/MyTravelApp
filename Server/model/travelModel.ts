import { CategorySchema } from "./CategoryModel";
import { UserSchema } from "./userModel";

const mongoose = require("mongoose");

export const TravelSchema = new mongoose.Schema({
    travelDateFrom: Date,
    travelDateTo: Date,
    travelDest: String,
    numberOfPeople: Number,
    travelPurpos: [String],
    Luggage: [String],
    Accommodation: [String],
    Activity: [String],
    Spiceal: [String],
    Transport: [String],
    Listofcat: [CategorySchema],
    user: UserSchema

})
const Travel = mongoose.model("Travel", TravelSchema);
export default Travel;
