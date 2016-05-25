

//routerにはexpressが必須

var express = require('express');
var fs = require('fs');
var router  = express.Router();

router.get('/', function (req, res, next) {
    res.render('react',{});
});

router.get('/comments.json', function(req,res,next){
    fs.readFile('comments.json',function(err,data){
        if (err){
            console.error(err);
        }
        res.json(JSON.parse(data));
    })
});

//router.get('/test',function(req,res){
//    res.render('test',{});
//});

module.exports = router;