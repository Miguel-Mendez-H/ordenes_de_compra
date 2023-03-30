const express = require('express');
const router = express.Router();


//se cambia la ruta del controlador a usar
const Controller = require('../../controllers/menusController/menusController');


router.get('/', Controller.getAll);
router.get('/:id', Controller.getOne);
router.post('/', Controller.createOne);
router.put('/:id', Controller.updateOne);
router.delete('/:id', Controller.deleteOne);


module.exports = router;