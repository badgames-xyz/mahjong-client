import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import HomePage from './HomePage'
import Mahjong from './Mahjong'

const history = createBrowserHistory();

const URL = "wss://echo.websocket.org"; // local testing URL
// const URL = ""; // production URL

class App extends React.Component {
    ws = new WebSocket(URL);

    componentDidMount() {
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }
    
        this.ws.onmessage = event => {
            // on receiving a message
            console.log(event.data);
        }
    
        this.ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            // this.setState({
            //     ws: new WebSocket(URL),
            // })
        }
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route 
                        path='/:handle'
                        render={(props) => <Mahjong {...props} ws={this.ws} />}
                    />
                </Switch>
            </Router>
        );
    }
}

export default App;
