
module.exports.UserGraph = 
`type userData { 
  name:String
  email:String
  password:String
  status:String
  token:String
}
input loginData {
  email:String
  password:String 
}
extend type Query {
  userLogin(login_data:loginData): userData
}
input addressInput{
  pincode:String
  city:String
}
input RegisterData{
  name:String!
  email:String!
  password:String!
  address:addressInput
}
extend type Mutation {
  userRegister(user_register:RegisterData) :userData
}` 