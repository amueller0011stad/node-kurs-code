const 
    router = require('express').Router(),
    newsController = require('../controllers/newsController'),
    settingsController = require('../controllers/settingsController');

router.get('/', newsController.renderHome);
router.get('/home', newsController.renderHome);
router.get('/admin', settingsController.renderSettings);
router.get('/settings', settingsController.renderSettings);
router.post('/settings', settingsController.receiveSettings);

module.exports = router;