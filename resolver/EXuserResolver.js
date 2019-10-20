const UserSchema= require('../modal/User');
module.exports.userResolver={
    Query:{
        async sampleQ(){
            console.log("im here inside login")
            return await {"name":'yes'}
        }
    },
}

// const UserSchema= require('../modal/User');
// module.exports.userResolver={
//     Query:{
//         async userLogin(){
//             console.log("im here inside login")
//             return await {"name":'yes'}
//         }
//     },
//     Mutation:{
//         async userRegister(args, req){
//             console.log("user data",req);
//             return await {name:"ok"}
//         }
//     }
// }
