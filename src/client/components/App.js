// Imports
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// App Imports
import routes from '../setup/routes'
import NotFound from './common/NotFound'

const App = (props) => (
    <Switch>
        { routes.map((route, index) => (
            // pass in the initialData from the server for this specific route
            <Route { ...route } key={ index }/>
        )) }

        <Route component={ NotFound } />
    </Switch>
);

export default App