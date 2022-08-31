const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        admin: true,
        user_name: 'Антон',
        email: 'anton@anton',
        password: await bcrypt.hash('12345678', 10),
        city: 'Уфа',
        link: 'https://vk.com/',
      },
      {
        admin: false,
        user_name: 'Сергей Васильевич',
        email: 'sergey@sergey',
        password: await bcrypt.hash('12345678', 10),
        city: 'Якутск',
        link: 'https://vk.com/',
      },
      {
        admin: true,
        user_name: 'Катя',
        email: 'katya@katya',
        password: await bcrypt.hash('12345678', 10),
        city: 'Питер',
        link: 'https://vk.com/',
      },
      {
        admin: false,
        user_name: 'Паша',
        email: 'pavel@pavel',
        password: await bcrypt.hash('12345678', 10),
        city: 'Питер',
        link: 'https://vk.com/',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users');
  },
};
