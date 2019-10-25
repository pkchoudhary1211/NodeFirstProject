const User= require('../modal/User')
module.exports={
    async getChat(socket){
            // console.log('full data')
            var data =await User.findOne({'_id':'5dad3e9fb238af4798133103'})
            // console.log('User Data' ,data)
            socket.emit('responseData',data)
       
        // console.log('user data',socket.handshak.query)
        return await data
        // console.log('inside get chat')
        // User.updateOne({'_id':'5dad3e9fb238af4798133103'},
        socket.emit('returnValue', 'ok');
        return  await{'name':'test dat'}
    },
    async sendChat(socket){
        console.log('inside send chat',socket.handshake.query)
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current hours
        let hours = date_ob.getHours();
        // current minutes
        let minutes = date_ob.getMinutes();
        let fullDate=date+"/"+month+"  @"+hours+":"+minutes
        console.log('user data',socket.handshake)
        
        User.updateOne({'_id':'5dad3e9fb238af4798133103'},
            { $push: {'chat':{'sender':socket.handshake.query.sender,'message':socket.handshake.query.message,'date':fullDate ,'id':'123123'}} }, async function(err, res){
                if(err){
                    console.log('new error',err)
                }
                if(res){
                    User.findOne({'_id':'5dad3e9fb238af4798133103'},
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
        var data =await User.findOne({'_id':'5dad3e9fb238af4798133103'})
        console.log('length: ',data.chat.length)
        if(data.chat.length==1)
        {   
            var sender=data.chat[0].sender=='admin'? 'user' :'admin'
            console.log('sender',sender)
            User.updateOne({'_id':'5dad3e9fb238af4798133103'},
            { $push: {'chat':{'sender':sender,'message':'Thanks You For Messaging Us We Wil Get Back To You Soon','date':fullDate ,'id':'123123'}}},
           async function(){
            if(err){
                console.log('new error',err)
            }})
        }
            // console.log('User Data' ,data)
        // socket.emit('responseData',data)
        console.log('socle datewt',)
    }
}