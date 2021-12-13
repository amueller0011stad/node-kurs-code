

const auth = (req, res, next) => {
    if (req.session && req.session.isLoggedIn === true) {
        next();
    } else {
        res.status(401);
        res.render('not-authorized');
    }
};

module.exports = auth;