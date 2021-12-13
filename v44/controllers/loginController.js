
const renderLogin = (req, res) => {
    res.render('login', {
        heading: 'Login',
        loginActive: true
    });
};

const submitLogin = (req, res) => {
    return renderLogin(req, res);
};

module.exports = {
    renderLogin,
    submitLogin
};