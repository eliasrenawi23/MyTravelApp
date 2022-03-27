import { ItmesSchema } from "./ItmesModel";
import{ TravelSchema } from "./travelModel";
const mongoose = require("mongoose");

export const CategorySchema = new mongoose.Schema({
        //travel:TravelSchema,
        CategoryName:String,
        list:[ItmesSchema]

})
const Category = mongoose.model("categories", CategorySchema);
export default Category;
