import React from 'react';

import Lobby from './Lobby'
import Game from './Game'
import LobbyDNE from './LobbyDNE'

class Mahjong extends React.Component {
    constructor(props) {
        super(props);

        let roomCode = String(window.location.pathname).slice(1);

        this.state = {
            lobbyMethod: "join",
            lobbyDNE: false,
            ws: this.props.ws,
            roomCode: roomCode,
            gameStarted: false,
            lobbyData: null,
            gameData: null,
        }

        if (this.props.location.state) {
            if (this.props.location.state.lobbyData) {
                this.state.lobbyData = this.props.location.state.lobbyData
            }

            if (this.props.location.state.lobbyMethod) {
                this.state.lobbyMethod = this.props.location.state.lobbyMethod
            }
        }
    }

    onChangeReadyStatus() {
        // use ws to tell the server that player ready status has changed
    }

    onStartGame() {
        let data = {};
        this.state.ws.emit("startGame", JSON.stringify(data));
    }

    componentDidMount() {
        if (this.state.lobbyMethod === "join") {
            let data = { roomCode: this.state.roomCode }
            this.state.ws.emit(
                "join",
                JSON.stringify(data)
            );
        }

        this.state.ws.on("lobbyData", (lobbyData) => {
            this.setState({
                lobbyData: lobbyData,
            })
        })

        this.state.ws.on("error", (err) => {
            console.log(err.code);
            this.setState({
                lobbyDNE: true,
            })
        })

        this.state.ws.on("gameData", (gameData) => {
            this.setState({
                gameStarted: true,
                gameData: gameData
            })
        })
    }

    render() {
        if (this.state.gameStarted) {
            return (
                <Game
                    gameData={this.state.gameData}
                    ws={this.state.ws}
                />
            )
        } else if (this.state.lobbyDNE) {
            return (
                <LobbyDNE />
            )
        } else {
            return (
                <Lobby
                    lobbyData={this.state.lobbyData}
                    onChangeReadyStatus={() => this.onChangeReadyStatus()}
                    onStartGame={() => this.onStartGame()}
                    ws={this.state.ws}
                />
            )
        }
    }
}

export default Mahjong