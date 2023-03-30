const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const menuRoutes = require('./menus/menus')

router.use('/users', userRoutes);
router.use('/menus', menuRoutes);

module.exports = router;