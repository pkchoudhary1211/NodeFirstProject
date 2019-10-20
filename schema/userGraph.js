
module.exports.UserGraph = 
`type userData { 
  name:String
  email:String
  password:String
}
input loginData {
  email:String
  password:String
}
extend type Query {
  userLogin(login_data:loginData): userData
}
input RegisterData{
  name:String!
  email:String!
  password:String!
}
extend type Mutation {
  userRegister(user_register:RegisterData) :userData
}
` 
