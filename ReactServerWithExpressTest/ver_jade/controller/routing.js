

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
            process.exit(1);
        }
        res.json(JSON.parse(data));
    })
});

router.post('/comments.json',function(req,res){
    fs.readFile('comments.json', function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);
        // NOTE: In a real implementation, we would likely rely on a database or
        // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
        // treat Date.now() as unique-enough for our purposes.
        var newComment = {
            id: Date.now(),
            author: req.body.author,
            text: req.body.text,
        };
        comments.push(newComment);
        fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(comments);
        });
    });
});

//router.get('/test',function(req,res){
//    res.render('test',{});
//});

module.exports = router;