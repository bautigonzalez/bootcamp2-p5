const express = require('express')
const router = express.Router()
const { packageController } = require('../controllers')

router.post('/create', packageController.create)

router.delete('/:customerId', packageController.delete)

module.exports = router
