const moongoose = require("mongoose")
const Schema = moongoose.Schema

const userSchema = new Schema({
    name: {type: String,required:true},
    email:{type:String,required:true},
    password:{type:String, required:true},
    address:{
        pincode:{
        require:true,
        type:String,
        },
        city:{
            require:true,
            type:String,
        }
    },
    chat:[{
       sender:{
           type:String
       },
       message:{
           type:String
       },
       date:{
           type:String
       }
}]
})
const User = moongoose.model("users", userSchema)
module.exports = User;
module.exports.getUsers = async ()=>{
    return await User.find();
}
module.exports.checkUserExist=async(email)=>{
    let user= await User.findOne({'email':email});
    console.log('user',user)
    return user!=null ? true:false;
}