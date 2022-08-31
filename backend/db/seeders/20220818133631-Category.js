module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        title: 'Сноубординг',
        description: 'Один из самых увлекательных зимних видов физической активности.',
        icon: '1.png',
        photo: 'Snowboarding2.jpg',
      },
      {
        title: 'Рафтинг',
        description: 'Спортивный сплав по горным рекам и искусственным гребным каналам на надувных судах (рафтах).',
        icon: '2.png',
        photo: 'Rafting1.jpg',
      },
      {
        title: 'Кемпинг',
        description: 'Если вы хотите поближе оказаться с природой, то кемпинг - это именно то, что вы ищете',
        icon: '3.png',
        photo: 'Camping1.jpg',
      },
      {
        title: 'Даунхилл',
        description: 'Экстремальная гоночная дисциплина горного велосипеда, суть которой заключается в прохождении трассы на время.',
        icon: '4.png',
        photo: 'Downhill1.jpg',
      },
      {
        title: 'Альпинизм',
        description: 'Вид спорта и активного отдыха, целью которого является восхождение на вершины гор.',
        icon: '5.png',
        photo: 'Mountaineering2.jpg',
      },
      {
        title: 'Хайкинг',
        description: 'Если вы планируете пеший поход на природе, по горным лугам, лесам и тропам продолжительностью не более одного дня, значит, вас ждет хайкинг',
        icon: '6.png',
        photo: 'Hiking1.jpg',
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
