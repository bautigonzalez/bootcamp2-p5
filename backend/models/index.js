const Customer = require('./customer')
const Package = require('./package')

Customer.hasMany(Package, { foreignKey: `customerId`, as: 'packages' })
Package.belongsTo(Customer, { foreignKey: `customerId`, as: 'customer' })

module.exports = { Customer, Package }
