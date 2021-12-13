const
    bcrypt = require('bcrypt'),
    userStorage = require('../storage/userStorage'),
    SALT_ROUNDS = 10;

const verifyLogin = async (username, password) => {
    const user = await userStorage.getOneByUsername(username);
    if (!user) {
        return false;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    return passwordMatch ? user : false;
};


const create = async user => {
    const p1 = userStorage.getByUsername(user.username);
    const p2 = bcrypt.hash(user.password, SALT_ROUNDS);
    const [result, passwordHash] = await Promise.all([p1, p2]);
    if (result.length > 0) {
        throw new Error(`User "${user.username}" already exists`);
    }
    const insertResult = await userStorage.insert({
        ...user,
        password: passwordHash
    });
    return {
        id: insertResult.insertId
    }
};

const getById = id => userStorage.getById(id);

const getAll = () => userStorage.getAll();

const deleteById = id =>
    userStorage.deleteById(id).then(affectedRows => ({
        affectedRows
    }));

const update = async (id, { username, firstName, lastName, password }) => {
    if (username) {
        // Check for duplicate user name
        if (await userStorage.usernameExistsElsewhere(id, username)) {
            const err = new Error('Username "' + username + '" already taken');
            err.code = 'DUPLICATE_USERNAME';
            throw err;
        }
    }
    if (password) {
        password = await bcrypt.hash(password, SALT_ROUNDS);
    }
    return userStorage
        .update(id, {
            username,
            firstName,
            lastName,
            password
        })
        .then(affectedRows => ({
            affectedRows
        }));
};

module.exports = {
    verifyLogin,
    create,
    getById,
    getAll,
    deleteById,
    update
};