const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ApprovedUserPost extends Model {}

ApprovedUserPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    postTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    responseContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    moderatorUserName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    moderatorId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'moderator',
          key: 'id',
      },
    },
  },
  
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'approvedUserPost',
  }
);

module.exports = ApprovedUserPost;