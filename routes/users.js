var express = require('express');
var router = express.Router();
var usersController = require("../controllers/usersController")

/* GET users listing. */
router.get('/', usersController.getAll);
router.post('/', usersController.create);
router.post('/login', usersController.login);

module.exports = router;
