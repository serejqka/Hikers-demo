const placeRouter = require('express').Router();

const {
  Place,
  Photo,
  Review,
} = require('../../db/models');

placeRouter.get('/places/:id', async (req, res) => {
  try {
    const places = await Place.findAll({
      where: {
        category_id: req.params.id,
      },
      include: {
        model: Photo,
      },
      raw: true,
    });

    const reviews = await Review.findAll({
      raw: true,
    });

    let check = false;

    // console.log('test', places);

    places.forEach(async (place) => {
      // console.log('places');
      const placeRew = reviews.filter((review) => review.place_id === place.id);
      // console.log('placeRew', placeRew);

      if (placeRew.length) {
        check = true;
        const average = Math.floor(
          placeRew.reduce((acc, el) => el.rating + acc, 0) / placeRew.length,
        );
        await Place.update({
          rating: average,
        }, {
          where: {
            id: place.id,
          },
          returning: true,
          raw: true,
        });
      }
    });

    if (check) {
      const newPlaces = await Place.findAll({
        where: {
          category_id: req.params.id,
        },
        raw: true,
        order: [
          ['rating', 'DESC'],
        ],
      });

      // console.log('newPlaces', newPlaces);

      const photos = await Photo.findAll({
        raw: true,
      });

      newPlaces.map((el) => {
        el.Photos = [];
        photos.forEach((photo) => {
          if (el.id === photo.place_id) {
            el.Photos.push(photo.title);
          }
        });
      });

      res.json(newPlaces);
    } else {
      const checkPlaces = await Place.findAll({
        where: {
          category_id: req.params.id,
        },
        raw: true,
        order: [
          ['rating', 'DESC'],
        ],
      });

      const photos = await Photo.findAll({
        raw: true,
        where: {
          review_id: null,
        },
      });

      checkPlaces.map((el) => {
        // console.log(el);
        el.Photos = [];
        photos.forEach((photo) => {
          if (el.id === photo.place_id) {
            // console.log('el.id', el.id)
            // console.log('photo.place_id', photo.place_id)
            // console.log('photo.title', photo.title)
            el.Photos.push(photo.title);
          }
        });
      });

      // console.log('check', checkPlaces)
      res.json(checkPlaces);

      // res.send(places);
    }

    // console.log(newPlaces);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = placeRouter;
