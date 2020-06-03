import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import NavBar from './NavBar'
import LobbyPlayer from './LobbyPlayer'
import LobbyLink from './LobbyLink'
import LobbyButtons from './LobbyButtons'

const linkPrefix = "badmahjong.xyz/";

const backgroundColour = "#2A9D8F";

class Lobby extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ws: this.props.ws,
            lobbyData: this.props.lobbyData,
            statusButtonAvailable: true,
        }
    }

    areAllPlayersReady() {
        let ready = true;
        for (let i = 0; i < this.state.lobbyData.players.length; ++i) {
            ready = ready && this.state.lobbyData.players[i].ready;
        }
        return ready;
    }

    onChangeIcon(index) {
        let data = { roomCode: this.state.lobbyData.roomCode, iconIndex: index };
        this.state.ws.emit("changeIcon", JSON.stringify(data));
    }

    onChangeName(name) {
        let data = { roomCode: this.state.lobbyData.roomCode, name: name };
        this.state.ws.emit("changeName", JSON.stringify(data));
    }

    onReady() {
        let data = { roomCode: this.state.lobbyData.roomCode };
        this.state.ws.emit("ready", JSON.stringify(data));
        this.setState({
            statusButtonAvailable: false,
        })
    }

    onNotReady() {
        let data = { roomCode: this.state.lobbyData.roomCode };
        this.state.ws.emit("notReady", JSON.stringify(data));
        this.setState({
            statusButtonAvailable: false,
        })
    }

    onStart() {
        let data = { roomCode: this.state.lobbyData.roomCode };
        this.state.ws.emit("startGame", JSON.stringify(data));
    }

    onLeave() {
        let data = { roomCode: this.state.lobbyData.roomCode };
        this.state.ws.emit("leave", JSON.stringify(data));
    }

    componentWillUnmount() {

    }

    componentDidUpdate(prevProps) {
        if (prevProps.lobbyData !== this.props.lobbyData) {
            this.setState({
                lobbyData: this.props.lobbyData,
                statusButtonAvailable: true,
            })
        }
    }

    render() {
        if (this.state.lobbyData) {
            return (
                <div
                    style={{
                        width: "100%",
                        height: "100vh",
                        backgroundColor: backgroundColour
                    }}
                >
                    <NavBar
                        onClickLogo={() => this.onLeave()}
                    />
                    <LobbyLink
                        link={linkPrefix + this.state.lobbyData.roomCode}
                    />
                    {this.state.lobbyData.players.map(x => (
                        <LobbyPlayer
                            key={x.id}
                            id={x.id}
                            name={x.name}
                            iconIndex={x.iconIndex}
                            canEdit={x.id === this.state.lobbyData.currentPlayer.id}
                            ready={x.ready}
                            isHost={x.isHost}
                            onChangeName={(name) => this.onChangeName(name)}
                            onChangeIcon={(index) => this.onChangeIcon(index)}
                        />
                    ))}
                    <LobbyButtons
                        ws={this.state.ws}
                        isHost={this.state.lobbyData.currentPlayer.isHost}
                        canStart={this.areAllPlayersReady()}
                        ready={this.state.lobbyData.currentPlayer.ready}
                        onReady={() => this.onReady()}
                        onNotReady={() => this.onNotReady()}
                        onStart={() => this.onStart()}
                        onLeave={() => this.onLeave()}
                        statusButtonAvailable={this.state.statusButtonAvailable}
                    />
                </div>
            )
        } else {
            return (
                <div
                    style={{
                        width: "100%",
                        height: "100vh",
                        backgroundColor: backgroundColour
                    }}
                >
                    <NavBar
                        onClickLogo={() => {}}
                    />
                    <div
                        style={{
                            margin: "auto",
                            marginTop: "25%",
                            textAlign: "center",
                        }}
                    >
                        <CircularProgress />
                    </div>
                </div>
            )
        }
    }
}

export default Lobby