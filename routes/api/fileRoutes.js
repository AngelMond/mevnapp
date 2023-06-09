const router = require('express').Router();
const fileController = require('../../controllers/fileController');

//User routes
router.get('/loadfile', fileController.verifyToken, fileController.getAllChecks);
router.post('/loadfile', fileController.verifyToken, fileController.createUserCheck);
router.put('/loadfile', fileController.verifyToken, fileController.findAndUpdate);
router.delete('/loadfile', fileController.verifyToken, fileController.findAndDelete);

module.exports = router ;