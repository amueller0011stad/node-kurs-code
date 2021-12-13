const knex = require('knex')(require('../knexfile'));

const insert = (user) => 
    knex.insert(user)
        .into('user')
        .returning('id')
        .then(idArray => ({
            insertId: idArray[0]
        }));

const getByUsername = username => 
    knex('user')
        .select('id', 'username', 'firstName', 'lastName')
        .where('username', username);

module.exports = {
    insert,
    getByUsername
};