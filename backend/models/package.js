const Sequelize = require('sequelize')
const db = require('../db')

class Package extends Sequelize.Model {}
Package.init(
    {
        type: {
            type: Sequelize.ENUM(['Prenda', 'Pequeño', 'Grande']),
            allowNull: false,
        },
    },
    { sequelize: db, modelName: 'package' },
)

module.exports = Package
