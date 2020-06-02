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

    onStartGame() {
        let data = {};
        this.state.ws.emit("startGame", JSON.stringify(data));
    }

    lobbyDataListener = (lobbyData) => {
        this.setState({
            lobbyData: lobbyData,
        })
    }

    errorListener = (err) => {
        console.log(`Error Code: ${err.code}`);
        this.setState({
            lobbyDNE: true,
        })
    }

    gameDataListener = (gameData) => {
        this.setState({
            gameStarted: true,
            gameData: gameData,
        })
    }

    onLeave() {
        let data = { roomCode: this.state.lobbyData.roomCode };
        this.state.ws.emit("leave", JSON.stringify(data));
    }

    onRefresh = (event) => {
        let data = { roomCode: this.state.lobbyData.roomCode };
        this.state.ws.emit("leave", JSON.stringify(data));
        this.setState({ lobbyMethod: "join" })
    }

    componentDidMount() {
        if (this.state.lobbyMethod === "join") {
            let data = { roomCode: this.state.roomCode }
            this.state.ws.emit(
                "join",
                JSON.stringify(data)
            );
        } else {
            let data = { roomCode: this.state.roomCode }
            this.state.ws.emit(
                "refresh",
                JSON.stringify(data)
            )
        }

        this.state.ws.on("lobbyData", this.lobbyDataListener);

        this.state.ws.on("error", this.errorListener);

        this.state.ws.on("gameData", this.gameDataListener);

        window.addEventListener("beforeunload", this.onRefresh)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        window.removeEventListener("beforeunload", this.onRefresh)
        this.state.ws.off("lobbyData", this.lobbyDataListener)
        this.state.ws.off("error", this.errorListener)
        this.state.ws.off("gameData", this.gameDataListener)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lobbyData !== this.props.lobbyData) {
            this.setState({
                lobbyData: this.props.lobbyData
            })
        }
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