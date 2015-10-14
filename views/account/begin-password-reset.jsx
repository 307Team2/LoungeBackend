var React = require('react');
var BeginPasswordResetWrapper = require('../layout.jsx');

var BeginPasswordReset = React.createClass({
  render: function() {
    return (
      <BeginPasswordResetWrapper title="Password Reset" page="begin-password-reset">
        <div className="container">
          <div className="content">
            <h1>Send password reset link</h1>
            <p><input type="text" name="email" placeholder="Email" /></p>
            <p><a className="btn" href="/account/reset_email_sent">Send</a></p>
          </div>
        </div>
      </BeginPasswordResetWrapper>
    );
  }
});

module.exports = BeginPasswordReset;
