const router = require('express').Router();
const apiRoutes = require('./api')

//APIs
router.use('/api', apiRoutes);

// //Not found
// router.use('*', (req,res) => {
//     try{
//         res.status(300).send({message: `The source doesn't exist`});
//     }catch(err){
//         res.status(500).send({message: 'Unable to find the searched source'});
//     }
// });

module.exports = router;