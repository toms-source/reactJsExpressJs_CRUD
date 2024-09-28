const express = require('express');
const userController = require('../Controllers/UserController');
const router = express.Router();

router.get('/', userController.getAllUser);
router.get('/user/:id', userController.getUserById);
router.post('/addUser', userController.createUser);
router.put('/updateUser/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;