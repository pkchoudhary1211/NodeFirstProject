const { buildSchema } = require("graphql");
const { gql } = require('apollo-server-express');
module.exports.user=
    `type Sample {
        name:String
        email:String
        password:String
    }
    extend type Query{
        sampleQ: Sample
    }
    `

;

// const { buildSchema } = require("graphql");
// const { gql } = require('apollo-server-express');
// module.exports.user=
//     `type User {
//         name:String!
//         email:String!
//         password:String
//     }
//     input userInput{
//        email:String!
//        password:String!
//     }
//     input userRegisterInput{
//         email:String!
//         password:String!
//      }
//     extends type Query{
//         userLogin(userinput:userInput):[User]!
//     }
//     extends type Mutation{
//         userRegister(register:userRegisterInput):User!
//     }`

// ;