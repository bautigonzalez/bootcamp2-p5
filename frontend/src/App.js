import { Route, Redirect, Switch } from 'react-router-dom'
import Customer from './screens/Customer'
import Home from './screens/Home'

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/customer/:id" component={Customer} />
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default App
