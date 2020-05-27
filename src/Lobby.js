import React from 'react';

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
        }
    }

    areAllPlayersReady() {
        let ready = true;
        for (let i = 0; i < this.state.lobbyData.players.length; ++i) {
            ready = ready && this.state.lobbyData.players[i].ready;
        }
        return ready;
    }

    onChangeReadyStatus() {
        // will have to send message to server
        // this.setState({ players: this.changeStatus() })
        this.props.ws.send("Hello")
        this.props.onChangeReadyStatus();
        // this.render(); // need to manually call this for now until players is passed as props
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lobbyData !== this.props.lobbyData) {
            this.setState({
                lobbyData: this.props.lobbyData
            })
        }
    }

    render() {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100vh",
                    backgroundColor: backgroundColour
                }}
            >
                <NavBar />
                <LobbyLink
                    link={linkPrefix + this.state.lobbyData.roomCode}
                />
                {this.state.lobbyData.players.map(x => (
                    <LobbyPlayer
                        key={x.id}
                        id={x.id}
                        name={x.name}
                        canEdit={x.isCurrentPlayer}
                        ready={x.ready}
                        isHost={x.isHost}
                    />
                ))}
                <LobbyButtons
                    ws={this.state.ws}
                    isHost={this.state.lobbyData.currentPlayer.isHost}
                    canStart={this.areAllPlayersReady()}
                    ready={this.state.lobbyData.currentPlayer.ready}
                    onChangeReadyStatus={() => this.onChangeReadyStatus()}
                />
            </div>
        )
    }
}

export default Lobby