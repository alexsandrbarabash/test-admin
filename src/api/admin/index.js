const express = require('express');
const { Car } = require('../../models/cars');
const { errorCatcher, validateBody } = require('../../middlewares');
const AdminController = require('../../controllers/AdminController');
const updateCarSchema = require('./schema');

const router = express.Router();

router.get(
  '/',
  errorCatcher(async (_, res) => {
    const { cars, categories } = await AdminController.getAllCars();

    res.render('admin', { cars, categories });
  })
);

router.post(
  '/:id',
  validateBody(updateCarSchema),
  errorCatcher(async (req, res) => {
    const { id } = req.params;
    const { name, description, price, color, categories } = req.body;

    await Car.findByIdAndUpdate(id, {
      name,
      description,
      price,
      color,
      categories,
    });

    res.redirect('/admin');
  })
);

module.exports = router;
