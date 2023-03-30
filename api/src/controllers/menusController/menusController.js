const model = require('../../models/menus');
const baseController = require('../baseController');

//replazar por el modelo a utilizar

const menusController = {
  getAll: baseController.getAll(model),
  getOne: baseController.getOne(model),
  createOne: baseController.createOne(model),
  updateOne: baseController.updateOne(model),
  deleteOne: baseController.deleteOne(model),
};

module.exports = menusController;