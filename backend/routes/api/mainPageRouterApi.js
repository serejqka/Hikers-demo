const mainPageRouterApi = require('express').Router();

const { Category } = require('../../db/models');

mainPageRouterApi.get('/mainpage', async (req, res) => {
  const category = await Category.findAll({ raw: true });

  res.json(category);
});

module.exports = mainPageRouterApi;
