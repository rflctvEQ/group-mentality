// Creating routes for rendering homepage with user/moderator interactions

const router = require('express').Router();
const { Moderator, User, ApprovedUserPost, ModeratorResponse, Comment } = require('../models');
const withAuth = require('../utils/auth');

// homepage 
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const approvedUserPostData = await ApprovedUserPost.findAll({

      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: ModeratorResponse,
          // TODO: attributes need to be updated to fit the ModeratorResponse model
          attributes: ['id', 'postTitle', 'postContent', 'dateCreated', 'responseContent', 'moderatorUserName', 'moderatorId'],
          include: {
            model: Moderator,
            attributes: ['userName']
          }
        },
        // * I'm not sure if this is the way to include Comments from both Users and Moderators 
        // * For the MVP, no comments anyway
        // {
        //   model: Comment,
        //   attributes: ['content'],
        //   include: {
        //     model: User, 
        //     attributes: ['name']
        //   }
        // },
        // {
        //   model: Comment,
        //   attributes: ['content'],
        //   include: {
        //     model: Moderator, 
        //     attributes: ['name']
        //   }
        // }
      ],
    });

    // Serialize data so the template can read it
    const posts = approvedUserPostData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      ...posts, 

      logged_in: req.session.logged_in 
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
