const mongoose = require("mongoose");

export const ItmesSchema = new mongoose.Schema({
        name:String,
        quantity:Number 

})
const Item = mongoose.model("Items", ItmesSchema);
export default Item;
