var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const rootSchema= require('./schema/contactGraph');
const rootResolver =require('./resolver/index');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose  = require("mongoose")
var cors = require('cors')
var graphqlHTTP = require('express-graphql');
const { ApolloServer, gql } = require('apollo-server-express');
var { buildSchema } = require('graphql');
const exe = require('./schema/extendSchema')
const authetication = require('./helpers/auth')
const MONGO_DB = "mongodb://localhost:27017/sampletest"
mongoose.connect(MONGO_DB,{
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000
})
mongoose.connection.on("connected",()=>{
  console.log("Connected to mongoDB")
})
const schema=exe()
const server = new ApolloServer({schema: schema
  ,context:async ({ req }) => {
  let user = await authetication.isAuthetication(req.headers.authorization);
  console.log('user value',await authetication.isAuthetication(req.headers.authorization))
  if (!user) throw new AuthenticationError('you must be logged in');
  return await {'ok':'tedw'};
}
});

const serverWithoutAuth = new ApolloServer({schema: schema});

var app = express();
// for no permission or auth
const grpahqlPath = '/graphql/no_permission';
serverWithoutAuth.applyMiddleware({ app,grpahqlPath });

//permission or auth routing
const grpahqlPathPermission = '/graphql';
server.applyMiddleware({ app,grpahqlPathPermission });
app.use(cors())

// var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: rootSchema,
//   rootValue: rootResolver,
//   graphiql: true,
// }));
// app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ind', indexRouter);
app.use('/users', usersRouter);
app.use('/frontend',indexRouter)
app.use('/contact',indexRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// var app = express()


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
