const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Favorite.belongsTo(models.Place, { foreignKey: 'place_id' });
      Favorite.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Favorite.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    place_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Places',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
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
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    modelName: 'Favorite',
    tableName: 'Favorites',
  });
  return Favorite;
};
