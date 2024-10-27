const express = require('express');
const router = express.Router();
const CarController = require('../../controllers/CarController');
const { errorCatcher, validateParams } = require('../../middlewares');
const schema = require('./schema');

router.get(
  '/:id',
  validateParams(schema),
  errorCatcher(async (req, res) => {
    const car = await CarController.getCarById(req.params.id);

    res.render('car', {
      title: `Car ${car.name}`,
      ...car,
    });
  })
);

module.exports = router;
