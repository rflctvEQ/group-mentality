const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ApprovedUserPost extends Model {
checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

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
<<<<<<< HEAD
      type: DataTypes.TEXT,
=======

      type: DataTypes.STRING,
>>>>>>> 30609a41133fc38c4ac2c31e8b0d7b623058e79e
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
    hooks: {
        beforeCreate: async (newUserpostData) => {
          newUserpostData.password = await bcrypt.hash(newUserpostData.password, 10);
          return newUserpostData;
        },
        beforeUpdate: async (updatedUserpostData) => {
          updatedUserpostData.password = await bcrypt.hash(updatedUserpostData.password, 10);
          return updatedUserpostData;
        },
      },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'approvedUserPost',
  }
);

module.exports = ApprovedUserPost;