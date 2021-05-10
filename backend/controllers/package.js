const { Customer, Package } = require('../models')

const packageController = {
    async create(req, res) {
        const { customerId, ...packageData } = req.body
        try {
            await Package.create({ customerId, ...packageData })
            const customer = await Customer.findByPk(customerId, {
                include: [{ association: 'packages' }],
            })
            res.json({ success: true, data: { customer } })
        } catch (e) {
            res.status(400).json({ success: false, error: e })
        }
    },
    async delete(req, res) {
        const { customerId } = req.params
        try {
            await Package.destroy({ where: { customerId } })
            const customer = await Customer.findByPk(customerId, {
                include: [{ association: 'packages' }],
            })
            res.json({ success: true, data: { customer } })
        } catch (e) {
            res.status(400).json({ success: false, error: e })
        }
    },
}

module.exports = packageController
