// This file creates our database and seed files

const sequelize = require('../config/connection');
const { User, Moderator, Comment, ModeratorResponse, UserPost, ApprovedUserPost } = require('../models');

const userData = require('./userData.json');
const moderatorData = require('./moderatorData.json');
const commentData = require('./commentData.json');
const moderatorresponseData = require('./moderatorresponseData.json');
const userPostData = require('./userpostData.json');
const approveduserpostData = require('./approveduserpostData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const user of userData) {
    await User.create({
      ...user,
    });
  }

  for (const moderator of moderatorData) {
    await Moderator.create({
      ...moderator,
    });
  }

  for (const userpost of userPostData) {
    await UserPost.create({
      ...userpost,
    });
  }
  
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    });
  }

  for (const moderatorresponse of moderatorresponseData) {
    await ModeratorResponse.create({
      ...moderatorresponse,
    });
  }

  for (const approveduserpost of approveduserpostData) {
    await ApprovedUserPost.create({
      ...approveduserpost,
    });
  }

  process.exit(0);
};

seedDatabase();
