const 
    bcrypt = require('bcrypt'),
    userStorage = require('../storage/userStorage'),
    ADMIN_HASH = '$2b$10$43TqYzm0YElUno0oqczGruHQDjc86RaHR/c9.pSHqDVke7Qdo0vIO',
    SALT_ROUNDS = 10;

const verifyLogin = (username, password) => {
    if (username !== "admin") {
        return Promise.resolve(false);
    }
    return bcrypt.compare(password, ADMIN_HASH);
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

module.exports = {
    verifyLogin,
    create,
    getById,
    getAll,
    deleteById
};