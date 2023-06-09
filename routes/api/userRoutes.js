const router = require('express').Router();

const userController = require('../../controllers/userController');

//User routes
router.post('/signup', userController.signup); //signup controller
router.post('/login', userController.login); //login controller



module.exports = router ;