const User = require('./User');
const Moderator = require('./Moderator');
const Comment = require('./Comment');
const ModeratorResponse = require('./ModeratorResponse');
const UserPost = require('./UserPost');
const ApprovedUserPost = require('./ApprovedUserPost');

UserPost.belongsTo(User, {
  foreignKey: 'userId',
});

// User have many posts
User.hasMany(UserPost, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

// Comment belongs to User
Comment.belongsTo(User, {
    foreignKey: 'userId',
});
  
// User have many comments
User.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

// Comment belongs to Post
Comment.belongsTo(UserPost, {
    foreignKey: 'postId',
});
  
// Post have many comments
UserPost.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
});

Comment.belongsTo(UserPost, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

ModeratorResponse.belongsTo(Moderator, {
  foreignKey: 'moderatorId',
});

Moderator.hasMany(ModeratorResponse, {
  foreignKey: 'moderatorId',
  onDelete: 'CASCADE',
});

Moderator.hasMany(ApprovedUserPost, {
  foreignKey: 'moderatorId',
  onDelete: 'CASCADE',
});

ApprovedUserPost.belongsTo(Moderator, {
  foreignKey: 'moderatorId',
});

ModeratorResponse.belongsTo(UserPost, {
  foreignKey: 'userPostID',
});
<<<<<<< HEAD
=======

>>>>>>> c187902807219903c07053925c41fbf427bdf5f5
UserPost.hasOne(ModeratorResponse, {
  foreignKey: 'userPostId',
});


module.exports = { User, Moderator, Comment, ModeratorResponse, UserPost, ApprovedUserPost };

