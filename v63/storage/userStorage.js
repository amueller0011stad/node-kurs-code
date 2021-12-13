const knex = require('knex')(require('../knexfile'));

const USER_FIELDS = [
    'id',
    'username',
    'firstName',
    'lastName'
];

const insert = (user) => 
    knex.insert(user)
        .into('user')
        .returning('id')
        .then(idArray => ({
            insertId: idArray[0]
        }));

const getByUsername = username => 
    knex('user')
        .select(...USER_FIELDS)
        .where('username', username);

const getById = id => 
    knex('user')
        .first(...USER_FIELDS)
        .where({ id });

const getAll = () => knex('user').select(...USER_FIELDS);

const deleteById = id => 
    knex('user').del().where({ id });

module.exports = {
    insert,
    getByUsername,
    getById,
    getAll,
    deleteById
};