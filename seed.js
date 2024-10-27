const fs = require('node:fs').promises;
const path = require('node:path');
const { connect } = require('./src/db');
const { Category } = require('./src/models/categories');
const { Car } = require('./src/models/cars');
const { program } = require('commander');

const importData = async (filePath, clearDb) => {
  try {
    await connect();

    if (clearDb) {
      console.log('Clearing the database...');
      await Category.deleteMany({});
      await Car.deleteMany({});
      console.log('Database cleared.');
    }

    const file = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(file);

    for (const categoryData of data.categories) {
      const category = new Category(categoryData);
      category.cars = [];
      await category.save();
      console.log(`Category "${category.name}" imported`);
    }

    for (const carData of data.cars) {
      const car = new Car(carData);
      await car.save();

      for (const categoryId of carData.categories) {
        await Category.findByIdAndUpdate(categoryId, { $push: { cars: car._id } }, { new: true });
      }

      console.log(`Car "${car.name}" imported`);
    }

    console.log('Import completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during import:', error);
    process.exit(1);
  }
};

program
  .option('--clear-db')
  .option('--file [file]')
  .action(async ({ clearDb, file }) => {
    await importData(path.resolve(file || './data.json'), clearDb);
  })
  .parseAsync(process.argv)
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
