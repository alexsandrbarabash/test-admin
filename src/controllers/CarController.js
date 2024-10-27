const { Car, Category } = require('../models');
const { NotFoundException } = require('../exceptions');

module.exports = class CarController {
  static async getCarById(id) {
    const car = await Car.findById(id).populate('categories').lean();

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    return car;
  }

  static async getCarsByCategory() {
    const carsByCategory = await Category.aggregate([
      {
        $lookup: {
          from: 'cars',
          localField: 'cars',
          foreignField: '_id',
          as: 'cars',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          cars: {
            $map: {
              input: '$cars',
              as: 'car',
              in: {
                _id: '$$car._id',
                name: '$$car.name',
                price: '$$car.price',
                description: '$$car.description',
                image: '$$car.image',
              },
            },
          },
        },
      },
    ]);

    return carsByCategory;
  }
};
