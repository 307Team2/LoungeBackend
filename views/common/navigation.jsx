var React = require('react');

var Navigation = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Lounge</a>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Navigation;
