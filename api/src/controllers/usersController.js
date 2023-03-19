const UserModel = require('../models/users');
const baseController = require('./baseController');


const userController = {
  getAll: baseController.getAll(UserModel),
  getOne: baseController.getOne(UserModel),
  createOne: baseController.createOne(UserModel),
  updateOne: baseController.updateOne(UserModel),
  deleteOne: baseController.deleteOne(UserModel),
};

module.exports = userController;