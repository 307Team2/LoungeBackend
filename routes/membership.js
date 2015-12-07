var jwt = require('jsonwebtoken');
var accountServices = require('../services/accountServices');
var User = require('../models/user.js');
var stripe = require("stripe")("sk_test_VgZHXpIF8hRIxSuoobWHnap7");

var tierMapping = {
    Bronze: "lounge-plan-bronze",
    Silver: "lounge-plan-silver",
    Gold: "lounge-plan-gold"
}

module.exports = function(app) {


    // /membership/create expects a req.body.tier and req.body.stripeToken
    app.post('/membership/create', function(req, res, next) {

        var authToken = req.get('Authorization');
        jwt.verify(authToken, app.get('superSecret'), function(error, userId) {

            if (error) res.status(500).send("User not logged in: " + error);

            User.findById(userId, function(err, user) {
                if (err) res.status(500).send("User not found: " + err);

                var stripeToken = req.body.stripeToken;
                var tier = req.body.tier;

                if (user.stripeId) {

                    stripe.customers.createSubscription(
                        user.stripeId,
                        {
                            plan: tierMapping[tier]
                        },
                    function(subsError, subscription) {
                        if (subsError) res.status(500).send("Stripe could not create subscription: " + subsError);

                        accountServices.updateUser(userId, { tier: tier, subscriptionId: subscription.id });

                        res.json({
                            subscription: subscription
                        });
                    });

                } else {

                    stripe.customers.create({
                      source: stripeToken.id,
                      email: user.username
                    }, function(custError, customer) {
                        if (err) res.status(500).send("Stripe could not create customer: " + custError);

                        stripe.customers.createSubscription(
                            customer.id,
                            {
                                plan: tierMapping[tier]
                            },
                        function(subsError, subscription) {
                            if (subsError) res.status(500).send("Stripe could not create subscription: " + subsError);

                            accountServices.updateUser(userId, { tier: tier, stripeId: customer.id, subscriptionId: subscription.id });

                            res.json({
                                subscription: subscription
                            });
                        });
                    });

                }
            });
        });
    });

    // /membership/update expects a req.body.tier
    app.post('/membership/update', function(req, res, next) {

        var auth_token = req.get('Authorization');
        jwt.verify(auth_token, app.get('superSecret'), function(error, userId) {
            if (error) res.status(500).send("User not logged in: " + error);

            User.findById(userId, function(err, user) {
                if (err) res.status(500).send("Could not find user: " + err);
                var tier = req.body.tier;

                // Update Subscription
                stripe.customers.updateSubscription(
                    user.stripeId,
                    user.subscriptionId,
                    { plan: tierMapping[tier] },
                    function(subsError, subscription) {
                        if (subsError) res.status(500).send("Stripe could not update subscription: " + subsError);
                        accountServices.updateUser(userId, { tier: tier, subscriptionId: subscription.id });
                    }
                );
            });
        });
    });

    // /membership/cancel expects a req.body.tier
    app.post('/membership/cancel', function(req, res, next) {

        var auth_token = req.get('Authorization');
        jwt.verify(auth_token, app.get('superSecret'), function(error, userId) {
            if (error) res.status(500).send("User not logged in: " + error);

            User.findById(userId, function(err, user) {
                if (err) res.status(500).send("Could not find user: " + err);

                // Update Subscription
                stripe.customers.cancelSubscription(user.stripeId, user.subscriptionId);
                accountServices.updateUser(userId, { tier: null, subscriptionId: null });
            });
        });
    });

};
