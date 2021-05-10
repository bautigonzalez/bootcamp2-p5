import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import API from '../../config/api'

const initialState = {
    customer: {},
    newPackage: 'Prenda',
    error: false,
}

const Customer = () => {
    const history = useHistory()
    const { id: customerId } = useParams()
    const [state, setState] = useState(initialState)

    useEffect(() => {
        async function fetchAPI() {
            try {
                const { customer } = await API.getCustomer(customerId)
                setState({ ...state, customer })
            } catch (e) {
                setState({ ...state, error: true })
            }
        }
        fetchAPI()
    }, [])

    const deletePackages = async () => {
        try {
            const { customer } = await API.deletePackages(customerId)
            setState({ ...state, customer })
        } catch (e) {
            setState({ ...state, error: true })
        }
    }

    const createPackages = async () => {
        try {
            const { customer } = await API.createPackage(
                customerId,
                state.newPackage,
            )
            setState({ ...state, customer })
        } catch (e) {
            setState({ ...state, error: true })
        }
    }

    const handleChange = (e) => {
        setState({ ...state, newPackage: e.target.value })
    }

    const handleClick = () => {
        history.push(`/`)
    }

    const { customer, newPackage, error } = state

    return (
        <div>
            <button onClick={handleClick}>Volver</button>
            <p>Cliente: {customer.name}</p>
            <p>Ticket: {customer.ticketNumber}</p>
            <p>Bultos: </p>
            <ul>
                {customer.packages &&
                    customer.packages.map((pack) => (
                        <li key={pack.id}>{pack.type}</li>
                    ))}
            </ul>
            {customer.packages && customer.packages.length < 3 ? (
                <div>
                    <select onChange={handleChange} value={newPackage}>
                        <option value="Prenda">Prenda</option>
                        <option value="Pequeño">Pequeño</option>
                        <option value="Grande">Grande</option>
                    </select>
                    <button onClick={createPackages}>Agregar bulto</button>
                </div>
            ) : null}
            <div>
                <button onClick={deletePackages}>Eliminar bultos</button>
            </div>
            {error ? <p>Ha ocurrido un error</p> : null}
        </div>
    )
}

export default Customer
