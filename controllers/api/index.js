const router = require('express').Router();
const userRoutes = require('./userRoutes');
const moderatorRoutes = require('./moderatorRoutes');

router.use('/users', userRoutes);
router.use('/moderators', moderatorRoutes);

module.exports = router;
