const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Photo.belongsTo(models.Review, { foreignKey: 'review_id' });
      Photo.belongsTo(models.Place, { foreignKey: 'place_id' });
    }
  }
  Photo.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    review_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Reviews',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    place_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Places',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    title: {
      allowNull: false,
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
    modelName: 'Photo',
    tableName: 'Photos',
  });
  return Photo;
};
