var express = require('express');
const nodemailer = require('nodemailer');
var router = express.Router();
const User = require("../modal/User")
 const Contact = require("../modal/Contact");

/* GET home page. */
router.get('/', async(req, res, next) => {
  const result = await User.getUsers()
  // .addContact
  res.json(result);
});
router.get('/api',async(req,res,next)=>{
  const result = await Contact.find();
  res.json(result);
  // await Conatct.addContact();
  // const result= await Conatct.getContact();
  // console.log("api data",result)
  // res.json(result);
});
//perfect code

//get data
router.get('/list',async(req,res,next)=>{
  const result=await Contact.getContact(req);
  console.log('result',result)
  res.json(result);
})
//inset data
router.post('/insert',async(req,res,next)=>{
  console.log("body",req.body)
  const insetData= new Contact({
    name:req.body.name,
    email:req.body.email,
    subject:req.body.subject,
    message:req.body.message
  })
  insetData.save();
  res.json({'result':'sucess'});
})
//remove data 
router.get('/remove/:id', async(req,res,next)=>{
  // console.log(req.params.id);
  const result=await Contact.deleteContact(req.params.id);
  res.json({'id':req.params.id});
})
//update data
router.put('/update',async(req,res,next)=>{
  console.log(req.body);
  console.log(req.body._id)
  const result= await Contact.updateContact(req)
  res.json(result);
})




















router.post('/contact',(req,res)=>{
  // var name=req.body.name;
  console.log("this is body",req.body)
  var mailData='Name :'+req.body.user.name+'<br/>  E-mail :'+req.body.user.email+'<br/>  Subject :'+req.body.user.subject+'<br/>  Message :'+req.body.user.message;
  console.log("hello",mailData);
  console.log("post request")
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
      // let testAccount = await nodemailer.createTestAccount();
      console.log('heello ');
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          host: 'smtp.mailtrap.io',
          port: 2525,
          secure: false, // true for 465, false for other ports
          auth: {
              user: '4dc7ea6a3b078a', // generated ethereal user
              pass: '08471842350daf' // generated ethereal password
          }
      });
      // send mail with defined transport object
      let info = await transporter.sendMail({
          from: '"Fred Foo 👻"ujjwal@gmail.com', // sender address
          to: 'pkchoudhary1211@gmail.com', // list of receivers
          subject: 'mail from Web', // Subject line
          text:  mailData, // plain text body
          html: mailData // html body
      });
      console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  main().catch(console.error);
  res.json({'result':'success','data' :mailData});
})
module.exports = router;
