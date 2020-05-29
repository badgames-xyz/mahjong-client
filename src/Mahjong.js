import React from 'react';

import Lobby from './Lobby'

class Mahjong extends React.Component {
    constructor(props) {
        super(props);

        let roomCode = String(window.location.pathname).slice(1);

        this.state = {
            lobbyMethod: "join", 
            ws: this.props.ws,
            roomCode: roomCode,
            gameStarted: false,
            lobbyData: null,
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