const Contact = require('../modal/Contact')
module.exports.testResolver={
    //Query for get the data
    Query:{
        //get all contact
        async contacts() {
            console.log("inside")
            const result =  Contact.find();
            console.log("data",result);
            return await result;
        },
        //search contact by name
        async searchContact(args,req){
            console.log("req",req);
            var keyWord =req.inputValue.name;
            var test = new RegExp(".*"+keyWord+"*");
            console.log('keyword :',test)
            return await Contact.find({'name': test});
        },
        //get user by id
        async getContactById(args,req){
            console.log("request",req.contactInput.id);
            var ObjectId = require('mongodb').ObjectID;
            var result =  Contact.find({'_id':new ObjectId(req.contactInput.id)});
            // console.log("result",result);
                return await result;
        }
    },
    //Mutation for insert update and delete
    Mutation:{
        //add new contact
        async addContact(args, req){
            console.log("args :",req)
            var inputData= new Contact({
                name:req.contactInput.name,
                email:req.contactInput.email,
                subject:req.contactInput.subject,
                message:req.contactInput.message
            })
           return await inputData.save()
            .then(result => {
                return result;
            });
        },
        //delete contact
        async deleteContact(args ,req){
            console.log('request',req.contactInput.id)
            return await Contact.removeOne({'_id':req.contactInput.id})
        },
        //update contactx`x
        async updateContact(args,req){
            // console.log("Test request",req);
            var bodyData=req.Contact_input;
            // console.log("test id",bodyData._id,"body data",{"name":bodyData.name,"email":bodyData.email,"subject":bodyData.subject,"message":bodyData.message})
            return await Contact.findOneAndUpdate({'_id':bodyData._id},{ $set: {"email":bodyData.email,"subject":bodyData.subject,"message":bodyData.message,"name":bodyData.name,}})
            // Contact.updateOne({"_id":bodyData._id},{$set:{"name":bodyData.name,"email":bodyData.email,"subject":bodyData.subject,"message":bodyData.message}});
            // const result =  Contact.find();
            // console.log("data  :",result);
            // return await result;
            // return await Contact.find()  ;
        }
    }
}
// module.exports = { 

//  contacts: async () => {
//     console.log("inside")
//     const result =  Contact.find();
//     console.log("data",result);
//     return await result;
    
// },
//  addContact: async(args, req)=>{
//     var inputData= new Contact({
//         name:args.contactInput.name,
//         email:args.contactInput.email,
//         subject:args.contactInput.subject,
//         message:args.contactInput.message    
//     })
//    return inputData.save()
//     .then(result => {
//         return result;
//     });
//     }
// }
// module.exports = [
//     contacts,
//     addContact
// ]