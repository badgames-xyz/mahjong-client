import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import HomePage from './HomePage'
import Lobby from './Lobby'

const history = createBrowserHistory();

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path='/:handle' component={Lobby} />
            </Switch>
        </Router>
    );
}

export default App;
