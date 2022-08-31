const router = require('express').Router();

const {
  Place,
  Favorite,
  Photo,
} = require('../../db/models');

router.route('/favourites')
  .get(async (req, res) => {
    const userId = req.session.user.id;

    try {
      const fav = await Favorite.findAll({
        raw: true,
        where: {
          user_id: userId,
          status: true,
        },
        include: [{ model: Place }],
      });

      const photo = await Photo.findAll({
        raw: true,
        where: {
          review_id: null,
        },
      });

      const favorites = fav.map((el) => {
        const photos = [];
        photo.forEach((item) => {
          if (el.place_id === item.place_id) {
            photos.push(item.title);
          }
        });
        return { ...el, photos };
      });

      res.json(favorites);
    } catch (error) {
      res.status(404).json(error);
    }
  }).delete(async (req, res) => {
    try {
      const {
        id,
      } = req.body.favPlaceID;

      await Favorite.update({
        status: false,
      }, {
        where: {
          id,
        },
      });

      res.json(id);
    } catch (error) {
      res.status(404).json(error);
    }
  }).post(async (req, res) => {
    const userId = req.session.user.id;
    const {
      placeid,
    } = req.body;

    try {
      const favorite = await Favorite.findOne({
        where: {
          user_id: userId,
          place_id: placeid,
        },
        raw: true,
        include: [{ model: Place }],
      });

      // если нет в избранном - добавляем в бд
      if (!favorite) {
        const createNewFavorite = await Favorite.create({
          user_id: userId,
          place_id: placeid,
        });

        const newFavorite = await Favorite.findOne({
          raw: true,
          where: {
            id: createNewFavorite.id,
          },
          include: [{ model: Place }],
        });

        const photo = await Photo.findAll({
          raw: true,
          where: {
            place_id: placeid,
          },
        });

        const photos = photo.map((el) => el.title);
        const favoriteWithPhotos = { ...newFavorite, photos };

        res.json(favoriteWithPhotos);
      } else {
        // если есть в избранном, обновляем статус
        await Favorite.update({
          status: true,
        }, {
          where: {
            user_id: userId,
            place_id: placeid,
          },
        });
        const updateFavorite = await Favorite.findOne({
          where: {
            user_id: userId,
            place_id: placeid,
          },
          raw: true,
        });

        const photo = await Photo.findAll({
          raw: true,
          where: {
            place_id: placeid,
          },
        });

        const photos = photo.map((el) => el.title);
        const favoriteWithPhotos = { ...updateFavorite, photos };

        res.json(favoriteWithPhotos);
      }
    } catch (error) {
      res.status(404).json(error);
    }
  });

module.exports = router;
