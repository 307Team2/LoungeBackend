var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");
module.exports = function(app) {

    app.post('/membership/create', function(req, res, next) {
    
            // TODO: Verify tier amounts with team
            var tierMapping = {
                'bronze': 10000,
                'silver': 50000,
                'gold': 100000
            };

            var stripeToken = request.body.stripeToken;
            var tier = request.body.tier;

            var charge = stripe.charges.create({
                amount: tierMapping[tier],
                currency: "usd",
                source: stripeToken,
                description: "Example charge",
                metadata: {'order_id': '6735'}
            }, function(err, charge) {
            if (err && err.type === 'StripeCardError') {
                // The card has been declined
            }
});
        
