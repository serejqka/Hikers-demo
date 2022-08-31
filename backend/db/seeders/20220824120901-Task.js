module.exports = {
  async up(queryInterface) {
    const tasksData = [
      {
        place_id: 1, user_id: 1, task: 'рюкзак', done: false,
      },
      {
        place_id: 1, user_id: 1, task: 'термос', done: true,
      },
      {
        place_id: 1, user_id: 2, task: 'рюкзак', done: false,
      },
      {
        place_id: 1, user_id: 3, task: 'рюкзак', done: false,
      },
      {
        place_id: 2, user_id: 1, task: 'сноуборд', done: false,
      },
      {
        place_id: 2, user_id: 2, task: 'сноуборд', done: false,
      },
      {
        place_id: 3, user_id: 3, task: 'термос', done: false,
      },
      {
        place_id: 3, user_id: 3, task: 'сноуборд', done: true,
      },
      {
        place_id: 4, user_id: 4, task: 'термос', done: false,
      },
      {
        place_id: 6, user_id: 1, task: 'термос', done: false,
      },
    ];

    await queryInterface.bulkInsert('Tasks', tasksData);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tasks');
  },
};
