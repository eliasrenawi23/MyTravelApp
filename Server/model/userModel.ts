
const mongoose = require("mongoose");

export const UserSchema = new mongoose.Schema({
    Email: String,
    FisrtName: String,
    LastName: String,
    _id :  mongoose.Types.ObjectId,
    imageUrl:String,
    password: String,
    role:String
})
const User = mongoose.model("users", UserSchema);
export default User;
