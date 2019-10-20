const User= require('../modal/User')
const bcrypt = require('bcrypt');
const saltRounds = 12;
module.exports.userResolver={
    //Query for get the data
    Query:{
        //get all contact
        async userLogin() {
            console.log(":hey there")
            bcrypt.hash("passwrod", saltRounds, function(err, hash) {
                if(err) {
                    console.log('error')
                }else{
                    console.log(hash)
                }
                // Store hash in your password DB.
              });
            return await {name: "Sehal"};
        },
    },
    Mutation:{
        async userRegister(args,req){
            console.log('userRegiser Data',req)
            var body=req.user_register
            let Userdata= new User({
                name:body.name,
                email:body.email,
                password:body.email
            })
            Userdata.save();
            return await {"name":"happy"}
        }
    }
    
}
