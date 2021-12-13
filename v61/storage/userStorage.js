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

const getById = id => 
    knex('user')
        .first('id', 'username', 'firstName', 'lastName')
        .where({ id });

module.exports = {
    insert,
    getByUsername,
    getById
};