const userService = require('../services/userService');

const create = (req, res) => {
    userService.create(req.body)
        .then(result => {
            res.status(200);
            res.json(result);
        })
        .catch(err => {
            res.status(400);
            res.end('Error: ' + err.message);
        }); 
};

const getById = (req, res) => {
    let id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400);
        res.end('Bad user ID given');
        return;
    }

    userService.getById(id).then(user => {
        if (user) {
            res.status(200);
            res.json(user);
        } else {
            res.status(404); // Not found
            res.json(null);
        }        
    });
};

const getAll = (req, res) => {
    return userService.getAll()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500);
            res.end("Error: " + err.message);
        });
};

const deleteById = (req, res) => {
    let id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400);
        res.end('Bad user ID given');
        return;
    }

    userService.deleteById(id).then(result => {
        const status = result.affectedRows === 0 ? 404 : 200;
        res.status(status);
        res.json(result);
    })
    .catch(err => {
        res.status(500);
        res.end('Error: ' + err.message);
    });
};

module.exports = {
    create,
    getById,
    getAll,
    deleteById
};