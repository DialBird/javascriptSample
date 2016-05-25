

//metaなどの閉じタグがないものは、終わりのスラッシュは必須
//また、metaタグのcharSetをキャメルケースで書かないと、アウトプットされない。注意
var CommentBox = React.createClass({
    loadCommentsFromServer(){
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
    handleCommentSubmit(comment){
        console.log(this.props.url);
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data){
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState(){
        return {data: []};
    },
    componentDidMount(){
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render(){
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
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
    handleSubmit(e){
        e.preventDefault();
        var author = ReactDOM.findDOMNode(this.refs.author).value.trim();
        var text = ReactDOM.findDOMNode(this.refs.text).value.trim();
        if (!text || !author){return;}
        this.props.onCommentSubmit({"author": author, "text": text});
        ReactDOM.findDOMNode(this.refs.author).value = '';
        ReactDOM.findDOMNode(this.refs.text).value = '';
        return;
    },
    render(){
        return(
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" value="Post" />
            </form>
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

ReactDOM.render(
    <CommentBox url="comments.json" pollInterval={2000}/>,
    document.getElementById('content')
);