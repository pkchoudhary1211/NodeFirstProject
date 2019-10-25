
module.exports.UserGraph = 
`type userData { 
  name:String
  email:String
  password:String
  status:String
  token:String
  chat:[chatTYPE]
  message:String
}
type chatTYPE{
  message:String
  sender:String 
  date:String
}
input loginData {
  email:String
  password:String 
}
extend type Query {
  userLogin(login_data:loginData): userData
  getChat:userData
}
input addressInput{
  pincode:String
  city:String
}
input chatInput{
  message:String
  sender:String
}
input RegisterData{
  name:String!
  email:String!
  password:String!
  address:addressInput
}
extend type Mutation {
  userRegister(user_register:RegisterData) :userData
  chat(userChat:chatInput) :userData
}` 

// input userChatInput{
//   message:String
//   date:String
// }
// input adminChatInput{
//   message:String
//   date:String
//   id:String
// }