const { Customer } = require('../models')

const customerController = {
    async findAll(req, res) {
        try {
            const customers = await Customer.findAll()
            res.json({ success: true, data: { customers } })
        } catch (e) {
            res.status(400).json({ success: false, error: e })
        }
    },
    async create(req, res) {
        try {
            await Customer.create(req.body)
            const customers = await Customer.findAll()
            res.json({ success: true, data: { customers } })
        } catch (e) {
            res.status(400).json({ success: false, error: e })
        }
    },
    async delete(req, res) {
        const { id } = req.params
        try {
            await Customer.destroy({ where: { id } })
            const customers = await Customer.findAll()
            res.json({ success: true, data: { customers } })
        } catch (e) {
            res.status(400).json({ success: false, error: e })
        }
    },
    async findOne(req, res) {
        try {
            const customer = await Customer.findByPk(req.params.id, {
                include: [{ association: 'packages' }],
            })
            res.json({ success: true, data: { customer } })
        } catch (e) {
            res.status(400).json({ success: false, error: e })
        }
    },
}

module.exports = customerController
