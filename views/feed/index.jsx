var React = require('react');
var LoungeWebWrapper = require('../layout.jsx');

var Feed = React.createClass({
  renderPosts: function() {
    return this.props.feedData.map(function(el, index) {
      console.log(index);
      return(
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">{el.author.firstname} {el.author.lastname}</h3>
          </div>
          <div className="panel-body">
            {el.content}
          </div>
        </div>
      );
    }, this);
  },

  render: function() {
    return (
      <LoungeWebWrapper title="Feed" page="feed">
        <div className="container">
          {this.renderPosts()}
        </div>
      </LoungeWebWrapper>
    );
  }
});

module.exports = Feed;
