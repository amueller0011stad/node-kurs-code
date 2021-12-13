const mysql = require('promise-mysql');

const connect = () => mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const insert = (user) => {
    return connect().then(conn => conn.query(
        `insert into user(username, firstName, lastName, password)
        values(?, ?, ?, ?)`,
        [user.username, user.firstName, user.lastName, user.password]
    ));
};

const getByUsername = username => {
    return connect()
        .then(conn => conn.query(
            `select id, username, firstName, lastName
                from user
                where username = ?`,
            [username]  
        ));
};

module.exports = {
    insert,
    getByUsername
};