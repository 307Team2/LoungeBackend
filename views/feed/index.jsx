var React = require('react');
var LoungeWebWrapper = require('../layout.jsx');
var Posts = require('./posts.jsx');

var Feed = React.createClass({

  cleanDate: function(date) {
    return Date.now().toLocaleDateString();
  },

  renderPosts: function() {
    return this.props.posts.map(function(post, index) {
      console.log(index);
      return(
        <div className="panel post">
          <div className="panel-body">
            <p className="post-content">{post.content}</p>
            <p className="post-metadata">
              <a href="#">{post.author.firstname} {post.author.lastname}</a> • <a href="#">{Date(post.timestamp)}</a></p>
          </div>
        </div>
      );
    });
  },

  renderNewPostForm: function() {
    return(
      <div className="panel new-post">
        <div className="panel-body">
          <h2 className="panel-title">Create a new post</h2>
          <textarea type="text" className="form-control" placeholder="What's on your mind?" />
          <button type="button" className="btn btn-success">Submit</button>
          <button type="button" className="btn btn-default">Cancel</button>
        </div>
      </div>
    );
  },

  render: function() {
    return (
      <LoungeWebWrapper title="Feed" page="feed">
        <div className="container">
          {this.renderNewPostForm()}
          <Posts posts={this.props.posts} />
        </div>
      </LoungeWebWrapper>
    );
  }

});

module.exports = Feed;
