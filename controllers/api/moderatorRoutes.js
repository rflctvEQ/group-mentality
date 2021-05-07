//* done for now

const router = require('express').Router();
const { Moderator, ApprovedUserPost, UserPost } = require('../../models');
const withAuth = require('../../utils/auth');
const { route } = require('./userRoutes');

// route for '/api/moderator/'
// this isn't necessary for MVP
// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newModerator = await Moderator.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newModerator);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// route for '/api/moderator/:id'
// not necessary for MVP
// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const moderatorData = await Moderator.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!moderatorData) {
//       res.status(404).json({ message: 'No moderator found with this id!' });
//       return;
//     }

//     res.status(200).json(moderatorData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//* this one works!
// route for '/api/users/'
// router.post('/', async (req, res) => {
//   try {
//     const moderatorData = await Moderator.create(req.body);

//     req.session.save(() => {
//       req.session.moderator_id = moderatorData.id;
//       req.session.logged_in = true;

//       res.status(200).json(moderatorData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post('/login', async (req, res) => {
  try {
    // const userData = await User.findOne({ where: { email: req.body.email } });
    const moderatorData = await Moderator.findOne({
      where: { email: req.body.email },
    });

    // if (!userData) {
    //   res
    //     .status(400)
    //     .json({ message: 'Incorrect email or password, please try again.' });
    //   return;
    // };

    if (!moderatorData) {
      res
        .status(400)
        .json({
          message: 'Incorrect moderator email or password, please try again.',
        });
      return;
    }

    // const validPassword = await userData.checkPassword(req.body.password);
    const validModeratorPassword = await moderatorData.checkPassword(
      req.body.password
    );

    // if (!validPassword) {
    //   res
    //     .status(400)
    //     .json({ message: 'Incorrect email or password, please try again' });
    //   return;
    // };

    if (!validModeratorPassword) {
      res
        .status(400)
        .json({
          message: 'Incorrect moderator email or password, please try again',
        });
      return;
    }

    // // if (userData) {
    //   req.session.save(() => {
    //     req.session.user_id = userData.id;
    //     req.session.logged_in = true;

    //     res.json({ user: userData, message: 'You are now logged in!' });
    //   });
    // };

    req.session.save(() => {
      req.session.moderator_id = moderatorData.id;
      req.session.logged_in_moderator = true;

      res.json({
        user: moderatorData,
        message: 'Welcome, moderator. You are now logged in!',
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//* this works!
// routing for creating new ApprovedUserPost
router.post('/', withAuth, async (req, res) => {
  try {
    const newApprovedUserPost = await ApprovedUserPost.create({
      ...req.body,
      moderatorId: req.session.moderatorId,
    });

    res.status(200).json(newApprovedUserPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//* this works!
// routing for deleting user posts
router.delete('/:id', withAuth, async (req, res) => {
  console.log('===========');
  console.log(req);
  try {
    const userPostData = await UserPost.destroy({
      where: {
        id: req.params.id,
        //* i'm not sure if this is correct
        // moderatorId: req.session.moderatorId
      },
    });

    if (!userPostData) {
      res.status(404).json({ message: 'No user post found with this id!' });
      return;
    }

    res.status(200).json(userPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// deleting user/response posts on homepage
// not for MVP

// deleting comments
// not for MVP

module.exports = router;
