const express = require('express');
const router = express.Router();
const CarController = require('../../controllers/CarController');
const { errorCatcher } = require('../../middlewares');

router.get(
  '/',
  errorCatcher(async (_, res) => {
    const carsByCategory = await CarController.getCarsByCategory();
    res.render('home', {
      title: 'Cars',
      carsByCategory: carsByCategory,
    });
  })
);

module.exports = router;
