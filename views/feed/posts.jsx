var React = require('react');

var Posts = React.createClass({

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

  render: function() {
    return(
      <div>
        {this.renderPosts()}
      </div>
    );
  }

});

module.exports = Posts;
