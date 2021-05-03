// routes for rendering moderator page (i.e. user posts to moderators)
const router = require('express').Router();
const { Moderator, User, UserPost, ModeratorResponse, Comment } = require('../models');
const withAuth = require('../utils/auth');



// Use withAuth middleware to prevent access to Moderator route
// TODO: create separate authentication code for Moderators and 
// TODO: create GET for rendering moderator page with each pending user post 
router.get('/moderator', withAuth, async (req, res) => {
    try {
      // Find all pending user posts 
      const userPosts = await UserPost.findAll({
        // * not yet sure what attributes to include 
        // attributes: { exclude: ['password'] },
        // include: [{ model: Moderator }],
      });
  
      const post = userPosts.get({ plain: true });
  
      res.render('moderatorPage', {
        ...post,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// TODO: create GET for rendering moderator page dedicated to updating and responding to user posts 

router.get('/moderator/:id', withAuth, async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    };
});