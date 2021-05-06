const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ModeratorResponse extends Model {}

ModeratorResponse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    moderatorId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'moderator',
          key: 'id',
      },
    },
    userPostId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'userPost',
        key: 'id',
      },
    },
  },
  
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'moderatorResponse',
  }
);

module.exports = ModeratorResponse;