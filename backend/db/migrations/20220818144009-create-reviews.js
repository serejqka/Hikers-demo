module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      place_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Places',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      title: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  },
};
