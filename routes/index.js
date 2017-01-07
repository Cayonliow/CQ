const exec = require('child_process').exec;
const express = require('express');
const path = require("path");
const querystring = require('querystring');
const request = require('request');
const router = express.Router();
const sha256 = require('sha256')
const supeagent = require('superagent');

var date=new Date();
const key = 'EvoeybENCmC0rwqa9Rjs';


/* GET home page. */
router.get('/', function(req, res, next) {
 // res.render('views/index', { title: 'Express' });
    res.sendFile(path.join(__dirname,'../views','index.html'));

});


router.get('/RequestToCQ',function(req, res){
    const parameter = querystring.parse(req._parsedUrl.query);
    const name = parameter.name;
    const password = sha256(parameter.password);

    exec(`curl "http://merry.ee.ncku.edu.tw:8888/playerInfo?key=${key}&account=${name}&password=${password}"`, function (error,stdout,stderr){
      if(error){
        return console.error(`exec error: ${error}`);    
      }

      console.log(stdout);
    
      if(stdout=='{"err":"no player meets"}'){
        console.log('routes said NotAPlayer');
        res.send({
            msg: "NotAPlayer"
        });
      }
      else{
        console.log('routes said :Player');
        res.send({
            msg: "ok"
        });
  
        //res.sendFile(path.join(__dirname,'../views','game.html'));
      }
   });


});

router.get('/ToGame',function(res2){



});




//res1.sendFile(path.join(__dirname,'../views','game.html'));


module.exports = router;
