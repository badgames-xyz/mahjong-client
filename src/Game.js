import React from 'react';

import Lobby from './Lobby'

const URL = "wss://echo.websocket.org"; // local testing URL
// const URL = ""; // production URL

class Game extends React.Component {
    constructor(props) {
        super(props);

        let you = {
            id: "Player 1",
            name: "Small Mac",
            isCurrentPlayer: true,
            isHost: false,
            ready: false,
        }

        this.state = {
            roomCode: this.props.match.params.handle,
            gameStarted: false,
            lobbyData: { // example data. Replace with real data from server
                gameID: 1234,
                roomCode: this.props.match.params.handle,
                players: [
                    you,
                    {
                        id: "Player 2",
                        name: "Sad Meal",
                        isCurrentPlayer: false,
                        isHost: false,
                        ready: false,
                    },
                    {
                        id: "Player 3",
                        name: "Triple Cheeseburger",
                        isCurrentPlayer: false,
                        isHost: false,
                        ready: true,
                    },
                    {
                        id: "Player 4",
                        name: "Chicken Nuggies",
                        isCurrentPlayer: false,
                        isHost: false,
                        ready: false,
                    }
                ],
                currentPlayer: you,
            }
        }
    }

    ws = new WebSocket(URL);

    // delete this once the server is set up
    changeYourStatus(cur) {
        let you = {
            id: "Player 1",
            name: "Small Mac",
            isCurrentPlayer: true,
            isHost: false,
            ready: !cur,
        }

        this.setState({
            lobbyData: { // example data. Replace with real data from server
                gameID: 1234,
                roomCode: this.props.match.params.handle,
                players: [
                    you,
                    {
                        id: "Player 2",
                        name: "Sad Meal",
                        isCurrentPlayer: false,
                        isHost: false,
                        ready: false,
                    },
                    {
                        id: "Player 3",
                        name: "Triple Cheeseburger",
                        isCurrentPlayer: false,
                        isHost: false,
                        ready: true,
                    },
                    {
                        id: "Player 4",
                        name: "Chicken Nuggies",
                        isCurrentPlayer: false,
                        isHost: false,
                        ready: false,
                    }
                ],
                currentPlayer: you,
            }
        })
    }

    processMessage(event) {
        console.log(event.data);
    }

    onChangeReadyStatus() {
        // use ws to tell the server that player ready status has changed
        this.changeYourStatus(this.state.lobbyData.currentPlayer.ready);
    }

    onStartGame() {

    }

    componentDidMount() {
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }
    
        this.ws.onmessage = event => {
            // on receiving a message
            this.processMessage(event);
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
        if (this.state.gameStarted) {
            return (
                <div>
                    Not Implemented Yet
                </div>
            )
        } else {
            return (
                <Lobby
                    // roomCode={this.state.roomCode}
                    lobbyData={this.state.lobbyData}
                    onChangeReadyStatus={() => this.onChangeReadyStatus()}
                    onStartGame={() => this.onStartGame()}
                    ws={this.ws}
                    // players={}
                />
            )
        }
    }
}

export default Game