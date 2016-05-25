
var React = require('react');
var $ = require("jquery");

var data = [
    {author: "Pete Hunt", text: "This is one comment"},
    {author: "Jordan Walke", text: "This is *another* comment"},
    {author: "Keisuke", text: "You did it!"}
];

//metaなどの閉じタグがないものは、終わりのスラッシュは必須
//また、metaタグのcharSetをキャメルケースで書かないと、アウトプットされない。注意
var CommentBox = React.createClass({
    getInitialState(){
        console.log($.ajax);    //undefined
        return {data: []};
    },
    componentDidMount(){
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render(){
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render(){
        var commentNodes = this.props.data.map(function(comment){
            return(
                <Comment author={comment.author}>{comment.text}</Comment>
            );
        });
        return(
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render(){
        return(
            <div className="commentForm">
                Hello, world! I am a CommentForm!!!!!
            </div>
        );
    }
});

var Comment = React.createClass({
    render(){
        return(
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                {this.props.children}
            </div>
        );
    }
});

module.exports = CommentBox;