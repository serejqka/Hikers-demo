const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Place, { foreignKey: 'place_id' });
      Review.belongsTo(models.User, { foreignKey: 'user_id' });
      Review.hasMany(models.Photo, { foreignKey: 'review_id' });
    }
  }
  Review.init({
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
    title: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    rating: {
      allowNull: false,
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
    modelName: 'Review',
    tableName: 'Reviews',
  });
  return Review;
};
