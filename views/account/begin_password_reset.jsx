var React = require('react');
var BeginPasswordResetWrapper = require('../layout.jsx');

var BeginPasswordReset = React.createClass({
  render: function() {
    return (
      <BeginPasswordResetWrapper title="Password Reset" page="begin-password-reset">
        <div className="container">
          <div className="content">
            <h1>Send password reset link</h1>
            <form action="/account/reset_email_sent" method="GET">
              <input type="text" name="email" placeholder="Email" />
              <br/>
              <input type="submit" value="Send" />
            </form>
          </div>
        </div>
      </BeginPasswordResetWrapper>
    );
  }
});

module.exports = BeginPasswordReset;
