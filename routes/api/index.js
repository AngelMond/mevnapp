const router = require('express').Router();

const userRoutes = require('./userRoutes');
const fileRoutes = require('./fileRoutes');

//Routes
router.use('/users', userRoutes);
router.use('/files', fileRoutes);



module.exports = router;