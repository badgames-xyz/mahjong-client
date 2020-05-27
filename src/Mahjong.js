import React from 'react';

import Lobby from './Lobby'

class Mahjong extends React.Component {
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
            ws: this.props.ws,
            roomCode: window.location.pathname,
            gameStarted: false,
            lobbyData: { // example data. Replace with real data from server
                gameID: 1234,
                roomCode: window.location.pathname,
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

    onChangeReadyStatus() {
        // use ws to tell the server that player ready status has changed
        this.changeYourStatus(this.state.lobbyData.currentPlayer.ready);
    }

    onStartGame() {

    }

    componentDidMount() {
        this.state.ws.addEventListener("message", function(ev) {
            console.log(ev.data);
        });
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
                    ws={this.state.ws}
                    // players={}
                />
            )
        }
    }
}

export default Mahjong