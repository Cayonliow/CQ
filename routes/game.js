var express = require('express');
var router = express.Router();
//var router=express.Router();
var supeagent=require('superagent');
var sha256= require('sha256')
var querystring = require('querystring');
var request=require('request');
var path=require("path");

var date=new Date();


/* GET home page. */
router.get('/', function(req, res) {
//  res.render('index', { title: 'Express' });
    res.sendFile(path.join(__dirname,'../views','game.html'));

    });


router.get('/',function(req, res) {
    connection.query('select * from `land`', function(error,land) {
        if(error) {
            throw error;
         }
    });
    res.send ({
      table: land });
});

module.exports = router;
