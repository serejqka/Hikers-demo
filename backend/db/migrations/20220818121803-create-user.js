module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      user_name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      email: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      city: {
        type: Sequelize.TEXT,
      },
      link: {
        type: Sequelize.TEXT,
      },
      ava: {
        type: Sequelize.TEXT,
        defaultValue: '/profile/1.png',
      },
      favorite_cat: {
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
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
