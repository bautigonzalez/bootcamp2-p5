const { Customer, Package } = require('../models')

const customers = [
    {
        name: 'Bautista Gonzalez',
        ticketNumber: 'ab123',
    },
    {
        name: 'Plataforma 5',
        ticketNumber: 'ab456',
    },
]

const createCustomers = async function () {
    try {
        const newCustomers = await Customer.bulkCreate(customers)
        Promise.all(
            newCustomers.map(async (customer) => {
                return Package.create({
                    type: 'Prenda',
                    customerId: customer.id,
                })
            }),
        )
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

createCustomers()
