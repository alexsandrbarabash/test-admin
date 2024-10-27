const { Category, Car } = require('../src/models');
const { randomBytes } = require('node:crypto');

const generateRandomString = () => randomBytes(64).toString('hex');
const generateRandomNumber = () => Math.floor(Math.random() * 1000000);

const createCategory = async (categoryData) => {
  const defaultCategory = {
    name: generateRandomString(),
    description: generateRandomString(),
    image: generateRandomString(),
    parent: null,
    cars: [],
  };

  const categoryToCreate = { ...defaultCategory, ...categoryData };
  const createdCategory = await Category.create(categoryToCreate);
  return createdCategory;
};

const createCar = async (carData) => {
  const createdCategory = await createCategory();

  const defaultCar = {
    name: generateRandomString(),
    price: generateRandomNumber(),
    description: generateRandomString(),
    image: generateRandomString(),
    categories: [createdCategory._id],
  };

  const carToCreate = { ...defaultCar, ...carData };
  const createdCar = await Car.create(carToCreate);

  await Promise.all(
    createdCar.categories.map(async (item) => {
      await Category.findByIdAndUpdate(item._id, {
        $push: { cars: { $each: [createdCar._id] } },
      });
    })
  );

  return createdCar;
};

module.exports = {
  createCategory,
  createCar,
  generateRandomString,
  generateRandomNumber,
};
