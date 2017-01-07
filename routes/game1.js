var express= require('express');
var router = express.Router();
var router=express.Router();
var supeagent=require('superagent');
var sha256= require('sha256')
var querystring = require('querystring');
var request=require('request');
var path=require("path");

var date=new Date();


/* GET home page. */
router.get('/', function(req, res) {
////  res.render('index', { title: 'Express' });
    res.sendFile(path.join(__dirname,'../views','game1.html'));

});

router.get('/FAIL',function(req,res){
    res.send({
      msg:"fail"
    });
});




module.exports = router;
