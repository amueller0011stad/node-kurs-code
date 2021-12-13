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

module.exports = {
    create 
};