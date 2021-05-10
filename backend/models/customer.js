const Sequelize = require('sequelize')
const db = require('../db')

class Customer extends Sequelize.Model {}
Customer.init(
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ticketNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
    },
    { sequelize: db, modelName: 'customer' },
)

module.exports = Customer
