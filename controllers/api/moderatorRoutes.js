const router = require('express').Router();
const { Moderator } = require('../../models');
const withAuth = require('../../utils/auth');

// route for '/api/moderators/'
router.post('/', withAuth, async (req, res) => {
  try {
    const newModerator = await Moderator.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newModerator);
  } catch (err) {
    res.status(400).json(err);
  }
});

// route for '/api/moderators/:id'
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const moderatorData = await Moderator.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!moderatorData) {
      res.status(404).json({ message: 'No moderator found with this id!' });
      return;
    }

    res.status(200).json(moderatorData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
