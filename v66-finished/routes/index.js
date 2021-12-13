const 
    router = require('express').Router(),
    newsController = require('../controllers/newsController'),
    settingsController = require('../controllers/settingsController'),
    loginController = require('../controllers/loginController'),
    userController = require('../controllers/userController'),
    authMiddleware = require('../middleware/authMiddleware');

router.get('/', newsController.renderHome);
router.get('/home', newsController.renderHome);

router.get('/admin', authMiddleware, settingsController.renderSettings);
router.get('/settings', authMiddleware, settingsController.renderSettings);
router.post('/settings', authMiddleware, settingsController.receiveSettings);

router.get('/login', loginController.renderLogin);
router.post('/login', loginController.submitLogin);
router.get('/logout', loginController.logout);

router.post('/user', userController.create);
router.get('/user/:id', userController.getById);
router.get('/user', userController.getAll);
router.delete('/user/:id', userController.deleteById);
router.patch('/user', userController.update);

module.exports = router;