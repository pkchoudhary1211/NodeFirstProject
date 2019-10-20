
module.exports.test = 
  `type Contact { 
    name:String!
    _id:String
    email:String!
    subject:String!
    message:String!
}

input ContactInput {
    _id:String
    name: String
    email: String
    subject:String
    message:String
}
input searchInput {
    name:String!
}
input IdInput{
    id:String!
}
extend type Query {
    contacts : [Contact]!
    searchContact(searchInput:searchInput): [Contact]!
    getContactById(contactInput:IdInput) :[Contact]!
}
extend type Mutation {
    addContact(contactInput:ContactInput) : Contact
    deleteContact(contactInput:IdInput) : Contact
    updateContact(Contact_input:ContactInput) : Contact
}` 

// type RootMutation {
//     addContact(contactInput : ContactInput): Contact
// }
// schema {
//     query: RootQuery
//     mutation: RootMutation
// }
// addContact(contactInputData:contactInputData):contactInputData
