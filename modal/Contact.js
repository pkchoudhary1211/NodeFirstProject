const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const contactSchema = new Schema({
    name:{
        type:String,
        // required:false
    }
    ,
    email:{
        type:String,
        // required:false
    },
    subject:{
        type:String,
        // required:false
    },
    message:{
        type:String,
    }
    
})
// const Contact = mongoose.model('contacts',contactSchema);
const Contact = mongoose.model('contacts', contactSchema);
module.exports = Contact;
module.exports.getContact = async(req)=>{
    if (("id" in req.query)==false){
        return await searchContact(req);
        // return await Contact.find();
    }else{
        var id=req.query.id;
        console.log('id :',id)
        var ObjectId = require('mongodb').ObjectID;
        // var o_id = new mongo.ObjectID(id);
        // var ObjectId = mongoose.contactSchema.ObjectId;
        return await Contact.findById("5da584b272a3882c4825c712");
    } 
}
async function searchContact(req){
    if(('name' in req.query)==false){
        console.log('name is not there')
        return await Contact.find(); 
    }else{
        console.log('name is there')
        var keyWord =req.query.name;
        var test = new RegExp(".*"+keyWord+"*");
        // console.log()
        console.log('keyword :',test)
        return await Contact.find({'name': test});
    }
}
module.exports.deleteContact= async(id)=>{
    return await Contact.remove({'_id':id});
    console.log(id)
}

module.exports.updateContact = async(req)=>{
    const body=req.body;
    console.log('body:',body)
    const result=null
    Contact.updateOne({'_id':req.body._id},{$set:body}, function(err,success){
      if(err){
        console.log('error:',err)
        result=err;
      }else{
        console.log('perfect:',success);
        res=success
      }
    });
    return await res;
}
// module.exports.addContact = async()=>{
//     const userContact= new Contact({
//         name:'Prakash'
//     })
//     return await userContact.save();
// }