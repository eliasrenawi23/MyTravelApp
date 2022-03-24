
const mongoose = require("mongoose");

export const UserSchema = new mongoose.Schema({
    Email: String,
    FisrtName: String,
    LastName: String,
    googleId : String,
    imageUrl:String,
    password: String,
})
const User = mongoose.model("users", UserSchema);
export default User;
