// Creating routes for rendering homepage with user/moderator interactions

// TODO: much of this needs to be edited to fit our project

const router = require('express').Router();
const { Moderator, User } = require('../models');
const withAuth = require('../utils/auth');

// route for '/'
router.get('/', async (req, res) => {
  try {
    // Get all moderators and JOIN with user data
    const moderatorData = await Moderator.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    constmoderators =moderatorData.map((moderator) =>moderator.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      moderators, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for '/moderator/:id'
router.get('/moderator/:id', async (req, res) => {
  try {
    const moderatorData = await Moderator.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const moderator = moderatorData.get({ plain: true });

    res.render('moderator', {
      ...moderator,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Moderator }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
