const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    static associate(models) {
      Place.belongsTo(models.Category, { foreignKey: 'category_id' });
      Place.hasMany(models.Review, { foreignKey: 'place_id' });
      Place.hasMany(models.Photo, { foreignKey: 'place_id' });
      Place.hasMany(models.Favorite, { foreignKey: 'place_id' });
      Place.hasMany(models.Task, { foreignKey: 'place_id' });
    }
  }
  Place.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    category_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    title: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    geo: {
      type: DataTypes.TEXT,
    },
    rating: {
      defaultValue: 0,
      type: DataTypes.INTEGER,
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
    modelName: 'Place',
  });
  return Place;
};