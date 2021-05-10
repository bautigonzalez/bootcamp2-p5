const express = require('express')
const router = express.Router()
const customerRoutes = require('./customer')
const packageRoutes = require('./package')

router.use('/customer', customerRoutes)
router.use('/package', packageRoutes)

module.exports = router
