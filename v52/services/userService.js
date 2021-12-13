const 
    bcrypt = require('bcrypt'),
    ADMIN_HASH = '$2b$10$43TqYzm0YElUno0oqczGruHQDjc86RaHR/c9.pSHqDVke7Qdo0vIO',
    mysql = require('promise-mysql');



const verifyLogin = (username, password) => {
    if (username !== "admin") {
        return Promise.resolve(false);
    }
    return bcrypt.compare(password, ADMIN_HASH);
};

const create = user => {
    return mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }) 
    .then(conn => {
        return conn.query(
            `insert into user(username, firstName, lastName, password)
            values(?, ?, ?, ?)`,
            [user.username, user.firstName, user.lastName, user.password]
        );
    })
    .then(result => {
        return {
            id: result.insertId
        };
    });
};

module.exports = {
    verifyLogin,
    create
};