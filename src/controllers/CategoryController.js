const { Category } = require('../models');
const { NotFoundException } = require('../exceptions');

module.exports = class CategoryController {
  static async getCategoryById(id) {
    const category = await Category.findById(id).populate('cars').populate('parent').lean();

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
};
