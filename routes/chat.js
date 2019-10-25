var express = require('express');
var router = express.Router();
// const User = require("../modal/User")
// const Contact = require("../modal/Contact");
router.get('/admin',function(req,res){
    console.log('User Chat')
    res.send({'name':'test name'})
})

module.exports = router;