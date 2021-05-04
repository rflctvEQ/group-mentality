const router = require('express').Router();
const userRoutes = require('./userRoutes');
const moderatorRoutes = require('./moderatorRoutes');

const userPostRoutes = require('./userPostRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/moderator', moderatorRoutes);
router.use('/post', userPostRoutes);
router.user('/comment', commentRoutes);

<<<<<<< HEAD
module.exports = router;
        
=======
module.exports = router;
>>>>>>> 9825ad2fb54a550a89f4cf93294e552dc403d5b6
