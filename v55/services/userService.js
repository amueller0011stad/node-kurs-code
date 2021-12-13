const 
    bcrypt = require('bcrypt'),
    ADMIN_HASH = '$2b$10$43TqYzm0YElUno0oqczGruHQDjc86RaHR/c9.pSHqDVke7Qdo0vIO',
    mysql = require('promise-mysql'),
    SALT_ROUNDS = 10;

const verifyLogin = (username, password) => {
    if (username !== "admin") {
        return Promise.resolve(false);
    }
    return bcrypt.compare(password, ADMIN_HASH);
};

const connect = () => mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const insert = (conn, user) => {
    return conn.query(
        `insert into user(username, firstName, lastName, password)
        values(?, ?, ?, ?)`,
        [user.username, user.firstName, user.lastName, user.password]
    );
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

const create = user => {
    let passwordHash = '';
    return getByUsername(user.username)
        .then(result => {
            if (result.length > 0) {
                throw new Error(`User "${user.username}" already exists`);
            }
            return bcrypt.hash(user.password, SALT_ROUNDS);
        })
        .then(hash => {
            passwordHash = hash;
        })
        .then(() => connect())
        .then(conn => insert(conn, {
            ...user,
            password: passwordHash
        }))
        .then(result => ({
            id: result.insertId
        }));
};

module.exports = {
    verifyLogin,
    create
};