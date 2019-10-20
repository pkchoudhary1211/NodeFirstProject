const Contact = require('./contactResolver')
const User = require('./userResolver') 

const rootResolver={
    ...Contact,
    ...User
}
module.exports =rootResolver;