const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const acl = require('../middleware/acl')

// Only accessable with provided admin jwt
router.get('/', acl.authenticate, userController.getAllUsers)

router.get('/:id', userController.getUser)

// Updating data of a user
router.put('/:id', userController.updateUser)

// To delete a specific user
router.delete('/:id', userController.deleteUser)

module.exports = router
