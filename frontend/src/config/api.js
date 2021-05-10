import axios from 'axios'

const baseURL = 'http://localhost:4000/api/'

const axiosInstance = axios.create({
    baseURL,
    validateStatus() {
        return true
    },
})

const responseHandler = (response) => {
    const {
        data: { data, error, success },
    } = response
    if (success) {
        return data
    } else {
        return Promise.reject(error)
    }
}

axiosInstance.interceptors.response.use(responseHandler, (error) =>
    Promise.reject(error),
)

const API = {}

API.getCustomers = () => axiosInstance.get('customer/all')

API.getCustomer = (id) => axiosInstance.get(`customer/${id}`)

API.createCustomer = (name, ticketNumber) =>
    axiosInstance.post(`customer/create`, { name, ticketNumber })

API.deleteCustomer = (customerId) =>
    axiosInstance.delete(`customer/${customerId}`)

API.createPackage = (customerId, type) =>
    axiosInstance.post(`package/create`, { customerId, type })

API.deletePackages = (customerId) =>
    axiosInstance.delete(`package/${customerId}`)

export default API
