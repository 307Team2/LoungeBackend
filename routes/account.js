module.exports = function(app) {

    /* GET sign up. */
    app.get('/account/login', function(req, res, next) {
        res.render('account/login');
    });

    /* GET sign up. */
    app.get('/account/signup', function(req, res, next) {
        res.render('account/signup');
    });

    /* GET begin password reset page. */
    app.get('/account/begin_password_reset', function(req, res, next) {
        res.render('account/begin-password-reset');
    });

    /* GET password reset complete page. */
    app.get('/account/password_reset_complete', function(req, res, next) {
        res.render('account/password-reset-complete');
    });

    /* GET reset email sent page. */
    app.get('/account/reset_email_sent', function(req, res, next) {
        res.render('account/reset-email-sent');
    });

    /* GET reset password page. */
    app.get('/account/reset_password', function(req, res, next) {
        res.render('account/reset-password');
    });
};
