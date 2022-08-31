const newCardApi = require('express').Router();

const { Place, Photo } = require('../../db/models');

newCardApi.post('/card/newcard', async (req, res) => {
  const {
    title, categoryid, description, geo,
  } = req.body.form;
  await Place.create({
    title,
    category_id: categoryid,
    description,
    geo,
  });
  res.json();
});

newCardApi.delete('/card/deletecard', async (req, res) => {
  const { id } = req.body;
  await Place.destroy({
    where: { id },
  });
  res.json();
});

newCardApi.put('/card/edit', async (req, res) => {
  const {
    title, id, description, geo,
  } = req.body.form;
  const cardUpdate = await Place.update({
    title,
    description,
    geo,
  }, {
    where: { id },
    returning: true,
    raw: true,
  });

  const [, [card]] = cardUpdate;

  const photos = await Photo.findAll({
    raw: true,
    where: {
      place_id: card.id,
    },
  });

  const addPhotos = photos.map((el) => el.title);

  const objCard = { ...card, Photos: addPhotos };

  res.json(objCard);
});

module.exports = newCardApi;
