const express = require('express')
const router = express.Router()
const { customerController } = require('../controllers')

router.get('/all', customerController.findAll)

router.post('/create', customerController.create)

router.delete('/:id', customerController.delete)

router.get('/:id', customerController.findOne)

module.exports = router
