const  {makeExecutableSchema} = require('graphql-tools')
const {test} = require('./contactGraph')
// const {UserGraph} = require('./userGraph')
const {UserGraph} = require("./userGraph")
const {userResolver} = require("../resolver/userResolver")
// const {userResolver}= require('../resolver/userResolver')
const {testResolver} =require('../resolver/contactResolver')
const { merge } = require('lodash');
// const {merge} = require('lodash');
const typedef=`type Query {
    _empty :String  
}
type Mutation{
    name: String!
}`
// const typedef1=`type Mutation{
//     name: String!
// }`
const resolver = {}
const exte= ()=>{
    // const resolvers = {};
    const executableSchema = makeExecutableSchema({
        typeDefs:[typedef,test, UserGraph],
        resolvers:merge(resolver, testResolver, userResolver),
    });
    return executableSchema
}
module.exports = exte
// const resolvers = {};
// module.exports=makeExecutableSchema({
//         typeDefs:[typedef,typedef1,test,userResolver],
//         resolvers:testResolver ,
//   });