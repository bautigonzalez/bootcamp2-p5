import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import API from '../../config/api'

const initialState = {
    customers: [],
    newName: '',
    newTicketNumber: '',
    invalidData: false,
    error: false,
}

const Home = () => {
    const history = useHistory()
    const [state, setState] = useState(initialState)

    useEffect(() => {
        async function fetchAPI() {
            try {
                const { customers } = await API.getCustomers()
                setState({ ...state, customers })
            } catch (e) {
                setState({ ...state, error: true })
            }
        }
        fetchAPI()
    }, [])

    const handleClick = (id) => {
        history.push(`customer/${id}`)
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { newName, newTicketNumber } = state
        try {
            const isValidToSubmit =
                newTicketNumber.length === 5 &&
                newTicketNumber ===
                    newTicketNumber.replace(/[^a-z0-9]/gi, '') &&
                newName.length > 3

            if (isValidToSubmit) {
                const { customers } = await API.createCustomer(
                    newName,
                    newTicketNumber,
                )
                setState({ ...state, customers })
            } else {
                setState({ ...state, invalidData: true })
            }
        } catch (e) {
            setState({ ...state, error: true })
        }
    }

    const handleDelete = async (id) => {
        try {
            const { customers } = await API.deleteCustomer(id)
            setState({ ...state, customers })
        } catch (e) {
            setState({ ...state, error: true })
        }
    }

    const { customers, newName, newTicketNumber, error, invalidData } = state

    return (
        <div>
            <h1>Clientes</h1>
            {customers.map((customer, index) => (
                <div key={index}>
                    {customer.name}{' '}
                    <button onClick={() => handleClick(customer.id)}>
                        Ver cliente
                    </button>
                    <button onClick={() => handleDelete(customer.id)}>
                        Eliminar cliente
                    </button>
                </div>
            ))}
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        name="newName"
                        value={newName}
                        onChange={handleChange}
                        placeholder="Nombre y Apellido"
                    />
                    <input
                        name="newTicketNumber"
                        value={newTicketNumber}
                        onChange={handleChange}
                        placeholder="Numero de ticket"
                    />
                    <button type="submit">Agregar cliente</button>
                </form>
            </div>
            {invalidData ? (
                <p>
                    El nombre debe tener al menos 3 dígitos y el numero de
                    ticket debe tener 5 dígitos alfanumericos
                </p>
            ) : null}
            {error ? <p>Ha ocurrido un error</p> : null}
        </div>
    )
}

export default Home
