module.exports = function(app) {

    /* GET sign up. */
    app.get('/login', function(req, res, next) {
        res.render('account/login');
    });

    /* GET sign up. */
    app.get('/signup', function(req, res, next) {
        res.render('account/signup');
    });

    /* GET begin password reset page. */
    app.get('/begin_password_reset', function(req, res, next) {
        res.render('account/begin-password-reset');
    });

    /* GET password reset complete page. */
    app.get('/password_reset_complete', function(req, res, next) {
        res.render('account/password-reset-complete');
    });

    /* GET reset email sent page. */
    app.get('/reset_email_sent', function(req, res, next) {
        res.render('account/reset-email-sent');
    });

    /* GET reset password page. */
    app.get('/reset_password', function(req, res, next) {
        res.render('account/reset-password');
    });
};
