var React = require('react');
var LoungeWrapper = require('../layout.jsx');

var Paywall = React.createClass({
  render:function() {
    return (
      <LoungeWrapper title="Tiers" page="payment">
        <form action="/charge" method="POST">
          <script src="https://checkout.stripe.com/checkout.js"
              className="stripe-button"
              data-key="pk_Fhlzwtm9SCx6Uxww5fNXX8CUbwwAc"
              data-amount="2000"
              data-name="Lounge"
              data-description="2 widgets ($20.00)"
              data-image="/128x128.png">
          </script>
        </form>
      </LoungeWrapper>
    );
  }
});

module.exports = Paywall;
