const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
// * Do we need this? 
router.use('/moderator');
router.use('/api', apiRoutes);

module.exports = router;
