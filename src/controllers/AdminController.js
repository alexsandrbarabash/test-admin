const { Car, Category } = require('../models');

module.exports = class AdminController {
  static async getAllCars() {
    const cars = await Car.find().lean();
    const categories = await Category.find().lean();

    return { cars, categories };
  }

  static async updateCar(id, { name, description, price, categories }) {
    await Car.findByIdAndUpdate(id, {
      name,
      description,
      price,
      categories,
    });
  }
};
