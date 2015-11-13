
stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");
module.exports = function(app) {

    app.get('/membership/create', function(req, res, next) {
        console.log("test");
        res.render('payment/paywall.jsx');
    });



//single token that represents the info the customer has
{
  id: "tok_u5dg20Gra", // String of token identifier,
  card: {...}, // Dictionary of the card used to create the token
  created: 1447356796, // Integer of date token was created
  currency: "usd", // String currency that the token was created in
  livemode: true, // Boolean of whether this token was created with a live or test API key
  object: "token", // String identifier of the type of object, always "token"
  used: false // Boolean of whether this token has been used
}

//sending form to the server
function stripeResponseHandler(status, response) {
  var $form = $('#payment-form');

  if (response.error) {
    // Show the errors on the form
    $form.find('.payment-errors').text(response.error.message);
    $form.find('button').prop('disabled', false);
  } else {
    // response contains id and card, which contains additional card details
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    // and submit
    $form.get(0).submit();
  }
};





/*stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");
module.exports = function(app) {

    app.get('/membership/create', function(req, res, next) {
        console.log("test");
        res.render('payment/paywall.jsx');
    });
*/

//making first charge

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
    });
};

stripe.customers.create(
  { email: 'customer@example.com' },
  function(err, customer) {
    err; // null if no error occurred
    customer; // the created customer object
  }
);

/* DOUBT - 
// Create a new customer and then a new charge for that customer:
stripe.customers.create({
  email: 'foo-customer@example.com'
}).then(function(customer) {
  return stripe.charges.create({
    amount: 1600,
    currency: 'usd',
    customer: customer.id
  });
}).then(function(charge) {
  // New charge created on a new customer
}).catch(function(err) {
  // Deal with an error
});
*/

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
