import { ItmesSchema } from "./ItmesModel";
const mongoose = require("mongoose");

export const CategorySchema = new mongoose.Schema({
        CategoryName:String,
        listincat:[ItmesSchema]

})
const Category = mongoose.model("categories", CategorySchema);
export default Category;
