const moongoose = require("mongoose")
const Schema = moongoose.Schema

const userSchema = new Schema({
    name: {type: String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const User = moongoose.model("users", userSchema)

module.exports = User;

module.exports.getUsers = async ()=>{
    return await User.find();
}