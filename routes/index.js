var express = require('express');
var router = express.Router();
var router=express.Router();
var supeagent=require('superagent');
var sha256= require('sha256')
var querystring = require('querystring');
var request=require('request');
var path=require("path");

var date=new Date();


/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
    res.sendFile(path.join(__dirname,'../views','index.html'));

});


router.get('/RequestToCQ',function(req,res1){
    
    //var parameter=querystring.parse(body);
    
    //var name=parameter.name;
    //var password=sha(parameter.password);
   // var key=EvoeybENCmC0rwqa9Rjs;

  console.log('dfdfdfdfdf');

    const exec=require('child_process').exec;
    exec(`curl "http://merry.ee.ncku.edu.tw:8888/playerInfo?key=EvoeybENCmC0rwqa9Rjs&account=test&password=${sha256('pass')}"`, function (error,stdout,stderr){
      if(error){
      
      console.log('wwwwwwwwwww');
      return console.error(`exec error: ${error}`);
      
      
      }

      //var data = JSON
      //if(stdout.err)
      //else
      //:wq
    //console.log(JSON.parse(stdout.err))
    console.log(stdout);
    })
});

module.exports = router;
