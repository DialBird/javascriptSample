
//リクエストは'/'につく文字列で決まるので。ここからルーティングできる

module.exports = function(app){
    app.use('/', require('../controller/routing'));
};