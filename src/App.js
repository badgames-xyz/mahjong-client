import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import io from 'socket.io-client'

import HomePage from './HomePage'
import Mahjong from './Mahjong'
import Game from './Game'

const history = createBrowserHistory();

const URL = "wss://badmahjong-server.herokuapp.com"; // production URL
// const URL = "ws://127.0.0.1:8000"; // local testing URL

class App extends React.Component {
    ws = io(URL);

    componentDidMount() {
        this.ws.on('connect', () => {
            console.log("Connected!"); // true
        });
    
        this.ws.onmessage = event => {
            // on receiving a message
            console.log(event.data);
        }
    
        this.ws.onclose = () => {
            console.log('Disconnected')
        }
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route
                        path="/mahjong-client/"
                        exact
                        render={(props) => <HomePage {...props} ws={this.ws} />}
                    />
                    <Route
                        path="/testgame"
                        exact
                        render={(props) => <Game {...props} ws={this.ws} />}
                    />
                    <Route 
                        path='/mahjong-client/:handle'
                        render={(props) => <Mahjong {...props} ws={this.ws} />}
                    />
                </Switch>
            </Router>
        );
    }
}

export default App;
