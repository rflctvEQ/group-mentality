// routes for rendering moderator page (i.e. user posts to moderators)
const router = require('express').Router();
const { Moderator, User, UserPost, ModeratorResponse, Comment } = require('../models');
const modAuth = require('../utils/modAuth');


//! this isn't working and i'm not really sure why
// Use withAuth middleware to prevent access to Moderator route
// TODO: create separate authentication code for Moderators and 
// TODO: create GET for rendering moderator page with each pending user post 
router.get('/', 
// modAuth, 
async (req, res) => {
    try {
      // Find all pending user posts 
      const userPosts = await UserPost.findAll({
        attributes: ['id', 'title', 'content', 'userId'],
        include: { 
          model: User, 
          attributes: ['id', 'name']
        },
      });
  
      const post = userPosts.get({ plain: true });
  
      res.render('moderatorPage', {
        ...post,
        // logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

//* this one works (except for the fact that 'pendingPostPage' doesn't exist yet)
router.get('/:id', 
// modAuth, 
async (req, res) => {
    try {
    const singleUserPostData = await UserPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ]
    });
    const singleUserPost = singleUserPostData.get({ plain: true });

    // TODO: this will need to match up with the handlebars name 
    res.render('pendingPostPage', {
      ...singleUserPost,
      // logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router; 