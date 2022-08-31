module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Favorites', [{
        place_id: 1,
        user_id: 1,
      },
      {
        place_id: 2,
        user_id: 2,
      },
      {
        place_id: 3,
        user_id: 3,
      }, {
        place_id: 1,
        user_id: 4,
      },
      {
        place_id: 2,
        user_id: 3,
      },
      {
        place_id: 3,
        user_id: 4,
      },
      {
        place_id: 5,
        user_id: 4,
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Favorites', null, {});
  },
};