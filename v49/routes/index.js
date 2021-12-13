const 
    router = require('express').Router(),
    newsController = require('../controllers/newsController'),
    settingsController = require('../controllers/settingsController'),
    loginController = require('../controllers/loginController');

router.get('/', newsController.renderHome);
router.get('/home', newsController.renderHome);

router.get('/admin', settingsController.renderSettings);
router.get('/settings', settingsController.renderSettings);
router.post('/settings', settingsController.receiveSettings);

router.get('/login', loginController.renderLogin);
router.post('/login', loginController.submitLogin);
router.get('/logout', loginController.logout);

module.exports = router;