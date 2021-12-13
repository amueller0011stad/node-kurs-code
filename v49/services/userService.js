const 
    bcrypt = require('bcrypt'),
    ADMIN_HASH = '$2b$10$43TqYzm0YElUno0oqczGruHQDjc86RaHR/c9.pSHqDVke7Qdo0vIO';

const verifyLogin = (username, password) => {
    if (username !== "admin") {
        return Promise.resolve(false);
    }
    return bcrypt.compare(password, ADMIN_HASH);
};

module.exports = {
    verifyLogin
};