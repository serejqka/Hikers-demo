const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    static associate(models) {
      Friend.belongsTo(models.User, { foreignKey: 'user_id' });
      Friend.belongsTo(models.User, { foreignKey: 'friend_id' });
    }
  }
  Friend.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    friend_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Friend',
    tableName: 'Friends',
  });
  return Friend;
};
