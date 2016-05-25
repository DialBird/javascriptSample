
//routerにはexpressが必須

var express = require('express');
var router  = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {});
});

router.get('/test',function(req,res){
    res.render('test',{});
});

module.exports = router;