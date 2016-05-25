
var React = require('react');

//metaなどの閉じタグがないものは、終わりのスラッシュは必須
//また、metaタグのcharSetをキャメルケースで書かないと、アウトプットされない。注意
var CommentBox = React.createClass({
    render(){
        return (
            <html lang="ja">
                <head>
                    <meta charSet="UTF-8" />
                    <title>React Test</title>
                </head>
                <body>
                    <p>hello keisuke</p>
                </body>
            </html>
        );
    }
});

module.exports = CommentBox;