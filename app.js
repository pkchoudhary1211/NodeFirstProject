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
const http = require("http");
var graphqlHTTP = require('express-graphql');
const { ApolloServer, gql } = require('apollo-server-express');
var { buildSchema } = require('graphql');
const exe = require('./schema/extendSchema')
const authetication = require('./helpers/auth')
const Chat = require('./script/chat')
const MONGO_DB = "mongodb://localhost:27017/sampletest"
// import path from 'path';
// import bodyParser from 'body-parser';
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
//   ,context:async ({ req }) => {
//   let user = await authetication.isAuthetication(req.headers.authorization);
//   console.log('user value',await authetication.isAuthetication(req.headers.authorization))
//   if (!user) throw new AuthenticationError('you must be logged in');
//   return await {'ok':'tedw'};
// }
});

// const serverWithoutAuth = new ApolloServer({schema: schema});

var app = express();
// for no permission or auth
// const grpahqlPath = '/graphql/no_permission';
// serverWithoutAuth.applyMiddleware({ app,grpahqlPath });
// const serverIO = require('http').createServer();
// const io = require('socket.io')(serverIO);

// const app = express();
// const serverSO = require('http').createServer(app);
// const io = require('socket.io').listen(serverSO);
// const PORT = 3001;
// serverSO.listen(PORT);
// console.log('Server is running');

// app.get('/', (req, res) => {
//    res.sendFile(__dirname + '/index.html');
// });

const socketIO = require('socket.io');
const serverIO = http.createServer(app);

const io = socketIO(serverIO, { origins: '*:*'});
io.on("connection", socket => {
  // console.log('socket',socket)
  console.log("New client connected"), setInterval(
    () => Chat.getChat(socket),
    // ()=>User.sendChat(socket),
    1000
  );
  // socket.emit('sendChat',(data) => {
  //   console.log('test')
  //   console.log(data); // data will be 'woot'
  // });

  // socket.on('sendChat',function(){
  //   console.log('tsst')
  //   User.sendChat(socket)
  // })

  socket.on("disconnect", () => console.log("Client disconnected"));
});





serverIO.listen(8001, () => console.log(`Listening on port 4001`));



const socketIO1 = require('socket.io');
const serverIO1 = http.createServer(app);
const io1 = socketIO(serverIO1, { origins: '*:*'});
io1.on("connection", socket => {
  // console.log('socket',socket)
  console.log("New client connected")
  Chat.sendChat(socket),
    // ()=>User.sendChat(socket),
  
  socket.on("disconnect", () => console.log("Client disconnected"));
});
serverIO1.listen(8002, () => console.log(`Listening on port 8002`));
// io.on('connection', client => {
//   console.log('connected')
//   client.  on('event', data => { 
//     console.log('hey im subgf')
//   });
//   client.on('disconnect', () => { /* … */ });
// });
// console.log('connection server',io)
// io.on('connection', client => {
//     console.log('connected')  
//     client.on('event', data => { 
//       console.log('hey im subgf')
//     });
//     client.on('disconnect', () => { console.log('disconnected')});
//     client.on('ack', () => { console.log('error')});
// })
// io.on('ERROR', client => {
//   console.log('ERROR')  
// })
// serverIO.listen(3001);


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
// app.use('/chat',Chat);
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
