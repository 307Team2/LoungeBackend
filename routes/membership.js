
stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");
module.exports = function(app) {

    app.get('/membership/create', function(req, res, next) {
        console.log("test");
        res.render('payment/paywall.jsx');
    });


//making first charge
var stripe = require("stripe")("sk_test_VgZHXpIF8hRIxSuoobWHnap7");

// (Assuming you're using express - expressjs.com)
// Get the credit card details submitted by the form
var stripeToken = request.body.stripeToken;

stripe.customers.create({
  source: stripeToken,
  plan: "gold",
  email: "payinguser@example.com"
}, function(err, customer) 

    app.post('/membership/create', function(req, res, next) {

        // TODO: Verify tier amounts with team
        var tierMapping = {
            'bronze': 10000,
            'silver': 50000,
            'gold': 100000
        };

        var stripeToken = req.body.stripeToken;
        var tier = req.body.tier;

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
    });
};


//to view one member's membership 
app.get('/member/:id', function(req, res, next) {        
    if(req.user)    {
        res.send(req.user.tier);
        } else {
            res.sendStatus(401);
        }
    });

//cancel subscription 
stripe.customers.cancelSubscription(
  "cus_3R1W8PG2DmsmM9",
  "sub_3R3PlB2YlJe84a",
  function(err, confirmation) {
    // asynchronously called
  }
);
