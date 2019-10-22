const User= require('../modal/User')
const bcrypt = require('bcrypt');
const saltRounds = 12;
var jwt = require('jsonwebtoken');
const winston = require('winston');
const logs= require('../helpers/logg')
// const log = require('simple-node-logger')
// var response={'status':""}
module.exports.userResolver={
    //Query for get the data
    Query:{
        async userLogin(args,req) {
            try{
                logs.infoLog('request',req.login_data)
                let user = await User.findOne({'email': req.login_data.email})
                if(!user){
                    throw new Error("User Not found")
                }
                const match = await bcrypt.compare(req.login_data.password, user.password);
                if(!match){
                    throw new Error("Incorrect Password")
                }else{
                    var value   = jwt.sign({
                                    data: user
                                }, 'secret', { expiresIn: '1h' });
                }
                return {'token':value}
             }
            catch(ex){
                logs.errorLog(ex.message,req.login_data);
                console.log('error',ex.message)
            }
            return {'token':value}
        },
    },
    Mutation:{
        async userRegister(args,req){
            try{
                var body=req.user_register
                console.log('body data :',body);
                let isExists=await User.checkUserExist(body.email);
                if(isExists){
                   throw new Error('user Already Exists')
                }
                bcrypt.hash(body.password,10, function(err,hash){
                    let Userdata= new User({
                        name:body.name,
                        email:body.email,
                        password:hash,
                        address:{
                            city:body.address.city,
                            pincode:body.address.pincode
                        }
                    })
                    logs.infoLog('post',req.user_register);
                    Userdata.save(); 
                })
            }   
            catch(ex){
                logs.errorLog(ex.message,req.user_register);
                console.log(ex)
            }
            return await {'status':'ok'}
        }
    }
}
