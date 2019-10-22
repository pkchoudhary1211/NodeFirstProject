var jwt = require('jsonwebtoken');
// module.exports.isAuthetication = async(token)=>{
//     console.log('user token',token);
//     // var result=jwt.verify(token, 'token');
//     // console.log("user result",result)
//     return await jwt.verify(token, 'token');
// }
module.exports={
    async isAuthetication(token){
        console.log('user data value',token)
        jwt.verify(token, 'secret', async function(err, decoded) {
            if (err) {
                console.log('Error',err)
                return await err ? false:true;
            }
          });
        let result =jwt.verify(token, 'secret');
        return await result==null? false : true;
        // console.log('data result',result)
        // return await jwt.verify(token, 'secret');
    }
}