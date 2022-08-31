module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Photos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      review_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Reviews',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      place_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Places',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      title: {
        allowNull: false,
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Photos');
  },
};
