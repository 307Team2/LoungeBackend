var React = require('react');
var ResetEmailSentWrapper = require('../layout.jsx');

var ResetEmailSent = React.createClass({
  render: function() {
    return (
      <ResetEmailSentWrapper title="Password Reset" page="reset-email-sent">
        <div className="container">
          <div className="content">
            <h1>Check your email</h1>
            <p>We've sent you an email! Click the link in the email to reset your password.</p>
            <p>If you don't see the email, check other places it might be, like your junk, spam, social, or other folders.</p>
          </div>
        </div>
      </ResetEmailSentWrapper>
    );
  }
});

module.exports = ResetEmailSent;
