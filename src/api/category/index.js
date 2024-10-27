const express = require('express');
const router = express.Router();
const { errorCatcher, validateParams } = require('../../middlewares');
const schema = require('./schema');
const CategoryController = require('../../controllers/CategoryController');

router.get(
  '/:id',
  validateParams(schema),
  errorCatcher(async (req, res) => {
    const category = await CategoryController.getCategoryById(req.params.id);

    res.render('category', {
      title: `Category ${category.name}`,
      ...category,
    });
  })
);

module.exports = router;
