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
        .then(user => {
            if (user) {
                // Login successful
                req.session.isLoggedIn = true;
                req.session.user = user;
                res.redirect('/settings');
            } else {
                req.body.loginFailed = true;
                renderLogin(req, res);
            }
        })
};

const logout = (req, res) => {
    if (req.session) {
        delete req.session.isLoggedIn;
    }
    res.redirect('/home');
};

module.exports = {
    renderLogin,
    submitLogin,
    logout
};