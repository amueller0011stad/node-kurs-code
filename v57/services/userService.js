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

const create = async user => {
    const p1 = getByUsername(user.username);
    const p2 = bcrypt.hash(user.password, SALT_ROUNDS);
    const [result, passwordHash] = await Promise.all([p1, p2]);
    if (result.length > 0) {
        throw new Error(`User "${user.username}" already exists`);
    }
    const conn = await connect();
    const insertResult = await insert(conn, {
        ...user,
        password: passwordHash
    });
    return {
        id: insertResult.insertId
    }
};

module.exports = {
    verifyLogin,
    create
};