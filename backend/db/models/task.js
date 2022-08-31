const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.Place, { foreignKey: 'place_id' });
      Task.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Task.init({
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
    task: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    done: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: 'Task',
    tableName: 'Tasks',
  });
  return Task;
};
