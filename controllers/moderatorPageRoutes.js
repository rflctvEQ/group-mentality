// routes for rendering moderator page (i.e. user posts to moderators)
const router = require('express').Router();
const { User, UserPost } = require('../models');
const modAuth = require('../utils/modAuth');


//* this works!
// Use withAuth middleware to prevent access to Moderator route
router.get('/', modAuth, async (req, res) => {
    try {
      // Find all pending user posts 
      const userPosts = await UserPost.findAll({
        attributes: ['id', 'title', 'content', 'userId'],
        include: { 
          model: User, 
          attributes: ['id', 'name']
        },
      });
  
      const post = userPosts.map((userPost) => userPost.get({ plain: true }))

      console.log('===============')
      console.log(post);
  
      res.render('moderatorHome', {
        post,
        logged_in: true
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//* this one works 
router.get('/:id', modAuth, async (req, res) => {
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

    res.render('moderatorResponsePage', {
      singleUserPost,
      logged_in_moderator: req.session.logged_in_moderator
    });
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router; 