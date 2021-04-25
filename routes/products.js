var express = require('express');
var router = express.Router();
var productsController = require("../controllers/productsController")

/* GET users listing. */
router.get('/', productsController.getAll);
router.get('/paginate', productsController.getAllPaginate);
router.get('/destacados', productsController.getDestacados)
router.get('/tags/:id', productsController.getByTags);
router.get('/:id', productsController.getById);
//router.post('/', productsController.create);
router.post('/', (req,res,next)=>{req.app.validateUser(req,res,next)},productsController.create);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.delete);

module.exports = router;
