const pool = require('./connectionPool');

const insert = (user) => pool.query(
    `insert into user(username, firstName, lastName, password)
    values(?, ?, ?, ?)`,
    [user.username, user.firstName, user.lastName, user.password]
);


const getByUsername = username => pool.query(
    `select id, username, firstName, lastName
        from user
        where username = ?`, 
    [username]  
);

module.exports = {
    insert,
    getByUsername
};