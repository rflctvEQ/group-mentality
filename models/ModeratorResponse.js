const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ModeratorResponse extends Model {
checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

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
    modelName: 'moderatorresponse',
  }
);

module.exports = ModeratorResponse;