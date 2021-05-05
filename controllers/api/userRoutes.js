// routes for creating user session, routes for logging in, and logging out

// TODO: much of this needs to be edited to fit our project

const router = require('express').Router();
const { User, Moderator } = require('../../models');

// route for '/api/users/'
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// route for '/api/users/login'
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    const moderatorData = await Moderator.findOne({ where: { email: req.body.email }});

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again.' });
      return;
    };

    if (!moderatorData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again.'})
      return;
    };

    const validPassword = await userData.checkPassword(req.body.password);
    const validModeratorPassword = await moderatorData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    };

    if (!validModeratorPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
        return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

    req.session.save(() => {
      req.session.user_id = moderatorData.id;
      req.session.logged_in = true;

      res.json({ user: moderatorData, message: 'You are now logged in!' })
    })

  } catch (err) {
    res.status(400).json(err);
  }
});

// route for '/api/users/logout'

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;