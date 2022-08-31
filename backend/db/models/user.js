const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Review, { foreignKey: 'user_id' });
      User.hasMany(models.Favorite, { foreignKey: 'user_id' });
      User.hasMany(models.Task, { foreignKey: 'user_id' });
      User.hasMany(models.Friend, { foreignKey: 'user_id' });
      User.hasMany(models.Friend, { foreignKey: 'friend_id' });
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    email: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.TEXT,
    },
    link: {
      type: DataTypes.TEXT,
    },
    ava: {
      type: DataTypes.TEXT,
      defaultValue: '/profile/1.png',
    },
    favorite_cat: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  });
  return User;
};
