module.exports = {
  isSelectedCategories: function (array, item) {
    if (!array || !Array.isArray(array)) {
      return false;
    }

    const ids = array.map((category) => category._id.toString());

    return ids.some((element) => element === item.toString());
  },
};
