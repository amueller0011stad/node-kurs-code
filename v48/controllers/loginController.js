const userService = require('../services/userService');


const renderLogin = (req, res) => {
    res.render('login', {
        heading: 'Login',
        loginActive: true,
        loginFailed: req.body.loginFailed,
        username: req.body.username
    });
};

const submitLogin = (req, res) => {
    userService.verifyLogin(req.body.username, req.body.password)
        .then(loginSuccess => {
            if (loginSuccess) {
                req.session.isLoggedIn = true;
                res.redirect('/settings');
            } else {
                req.body.loginFailed = true;
                renderLogin(req, res);
            }
        })
};

module.exports = {
    renderLogin,
    submitLogin
};