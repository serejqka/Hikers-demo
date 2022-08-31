const router = require('express').Router();
const storageFileUpload = require('../../middleware/storageFileUpload');

const { Review, User, Photo } = require('../../db/models');

router
  .get('/place/:id/review', async (req, res) => {
    const { id } = req.params;
    try {
      const review = await Review.findAll({
        raw: true,
        where: { place_id: id },
        include: [{ model: User }],
        order: [['createdAt', 'ASC']],
      });
      const photos = await Photo.findAll({
        raw: true,
        where: { place_id: null },
      });
      res.json({ review, photos });
    } catch (error) {
      res.status(404).json(error);
    }
  })
  .post('/place/:id/review', async (req, res) => {
    try {
      const {
        placeId,
        title,
        description,
        date,
        rating,
        photo,
      } = req.body.valueForm;

      const userId = req.session.user.id;
      const newReview = await Review.create({
        title,
        description,
        date,
        rating,
        user_id: userId,
        place_id: placeId,
      });
      if (Array.isArray(photo)) {
        await Promise.all(
          // eslint-disable-next-line no-return-await
          photo.map(async (el) => await Photo.create({
            review_id: newReview.id,
            title: el,
          })),
        );
      } else {
        await Photo.create({
          review_id: newReview.id,
          title: photo,
        });
      }

      const review = await Review.findOne({
        raw: true,
        where: { id: newReview.id },
        include: [{ model: User }],
      });

      let photos;

      if (Array.isArray(photo)) {
        photos = await Photo.findAll({
          raw: true,
          where: { review_id: review.id },
        });
      } else {
        photos = await Photo.findOne({
          raw: true,
          where: { review_id: review.id },
        });
      }

      res.json({ review, photos });
    } catch (err) {
      console.log(err);
    }
  })
  .post('/place/photo', async (req, res) => {
    try {
      const photos = req.files.homesImg;
      let arrUrl;
      if (Array.isArray(photos)) {
        arrUrl = await Promise.all(
          photos.map(async (el) => await storageFileUpload(el)),
        );
      } else {
        arrUrl = await Promise.all(
          await storageFileUpload(photos),
        );
        arrUrl = arrUrl.join('');
      }
      res.json(arrUrl);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
