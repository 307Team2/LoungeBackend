module.exports = function(app) {

    /* GET sign up. */
    app.get('/account/login', function(req, res, next) {
        res.render('account/login');
    });

    /* GET sign up. */
    app.get('/account/signup', function(req, res, next) {
        debugger;
        res.render('account/signup');
    });

    app.post('/account/signup', function(req, res, next) {

        debugger;
        User.register(new User({email : req.body.email}), req.body.password, function(err, user) {
            if (err) {
                    console.log(err);
                    res.redirect('/account/signup');
            } else {
                passport.authenticate('local')(req, res, function () {
                    debugger;
                    res.redirect('/');
                });
            }
        });
    });

    /* GET begin password reset page. */
    app.get('/account/begin_password_reset', function(req, res, next) {
        res.render('account/begin_password_reset');
    });

    /* GET password reset complete page. */
    app.get('/account/password_reset_complete', function(req, res, next) {
        res.render('account/password_reset_complete');
    });

    /* GET reset email sent page. */
    app.get('/account/reset_email_sent', function(req, res, next) {
        res.render('account/reset_email_sent');
    });

    /* GET reset password page. */
    app.get('/account/reset_password', function(req, res, next) {
        res.render('account/reset_password');
    });
};
