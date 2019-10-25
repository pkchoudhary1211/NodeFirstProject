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
        async getChat(args, req){
            try{
                var data =await User.findOne({'_id':'5da9b8400ffc963afcf22af7'})
                // console.log('User Data' ,data)
                return await data
            }catch(Ex){
                console.log('error',Ex)
            }
        }
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
        },
        async chat(args,req){
            try{
                console.log("user Request data", req.userChat)
                let date_ob = new Date();
                let date = ("0" + date_ob.getDate()).slice(-2);
                let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                // current hours
                let hours = date_ob.getHours();
                // current minutes
                let minutes = date_ob.getMinutes();
                let fullDate=date+"/"+month+"  @"+hours+":"+minutes
                console.log('date',fullDate);
                User.updateOne({'_id':'5da9b8400ffc963afcf22af7'},
                { $push: {'chat':{'sender':req.userChat.sender,'message':req.userChat.message,'date':fullDate ,'id':'123123'}} }, async function(err, res){
                    if(err){
                        console.log('new error',err)
                    }
                    if(res){
                        User.findOne({'_id':'5da9b8400ffc963afcf22af7'},
                        (err,res)=>{
                            if(err){
                                console.log('eerrrrorr')
                            }if(res){
                                // console.log('so=ize',typeof(res.chat),res.chat.length)
                            }
                        })
                        console.log('perfect code   ')
                    }
                })
                return await {'name':"name user"}
            }   
            catch(ex){
                throw new Error(ex)
            }
        },
    }
}
