var React = require('react');
var LoungeWrapper = require('../layout.jsx');
var tierCategories = require('./tier_categories');

var UpdateMembership = React.createClass({
  getStripeButton: function(amount, tier) {
    if (this.props.user.tier !== tier.toLowerCase()) {
      return (
        <form action="" method="POST">
          <script
            src="https://checkout.stripe.com/checkout.js"
            className="stripe-button"
            data-key="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
            data-amount={amount}
            data-name="Lounge"
            data-description={tier}
            data-image="/128x128.png"
            data-locale="auto">
          </script>
        </form>
      );
    } else {
      return (
        <h4>Your Current Tier</h4>
      );
    }
  },
  getTiers: function() {
    var self = this;
    return tierCategories.map(function(tier) {
      return (
        <div className="col-xs-4">
          <div className="panel">
            <div className="panel-title">
              <h2>{tier.name}</h2>
            </div>
            <div className="panel-body">
              <p className="payment-desc">
                {tier.description}
              </p>
              {self.getStripeButton(tier.cost, tier.name)}
            </div>
          </div>
        </div>
      );
    });
  },
  render: function() {
    return (
      <LoungeWrapper title="Membership Tiers" page="paywall">
        <div className="container">
          <h1>Update Your Membership!</h1>
          <div className="row">
            {this.getTiers()}
          </div>
        </div>
      </LoungeWrapper>
    );
  }
});

module.exports = UpdateMembership;
