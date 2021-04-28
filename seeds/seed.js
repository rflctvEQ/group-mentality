// this file creates our database 
// this shouldn't be edited too much; only to work well with other seed files 

// Anywhere where it says "Project", we'll likely want to update it to say "Moderator" 
const sequelize = require('../config/connection');
const { User, Moderator } = require('../models');

const userData = require('./userData.json');
const moderatorData = require('./moderatorData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const moderator of moderatorData) {
    await Moderator.create({
      ...moderator,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();