const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const moderatorPageRoutes = require('./moderatorPageRoutes');

router.use('/', homeRoutes);
router.use('/moderator', moderatorPageRoutes);
router.use('/api', apiRoutes);

module.exports = router;
