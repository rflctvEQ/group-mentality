const User = require('./User');
const Moderator = require('./Moderator');

User.hasMany(Moderator, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Moderator.belongsTo(User, {
  foreignKey: 'userId'
});


module.exports = { User, Moderator };
