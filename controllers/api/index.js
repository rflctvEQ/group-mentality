const router = require('express').Router();
const userRoutes = require('./userRoutes');
const moderatorRoutes = require('./moderatorRoutes');

const userPostRoutes = require('./userPostRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/moderator', moderatorRoutes);
router.use('/post', userPostRoutes);
router.user('/comment', commentRoutes);

module.exports = router;