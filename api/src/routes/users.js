const express = require('express');
const router = express.Router();

const User = require('../models/users');
const userController = require('../controllers/userscontroller');


router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', userController.createOne);
router.put('/:id', userController.updateOne);
router.delete('/:id', userController.deleteOne);


module.exports = router;