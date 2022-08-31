const categoryRouter = require('express').Router();

const {
  Category,
} = require('../../db/models');

categoryRouter.get('/categories/:id', async (req, res) => {
  try {
    // console.log(req.p)
    const categories = await Category.findOne({
      where: {
        id: req.params.id,
      },
      raw: true,
    });
    // res.send(places)
    // console.log('категории сервер', categories)
    res.send(categories);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = categoryRouter;
