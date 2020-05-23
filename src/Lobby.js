import React from 'react';

import NavBar from './NavBar'
import PlayerLobbyData from './PlayerLobbyData'
import LinkBar from './LinkBar'

const backgroundColour = "#2A9D8F";

class Lobby extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomCode: this.props.match.params.handle,
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
                <LinkBar
                    link={"badmahjong.xyz/" + this.state.roomCode}
                />
                <PlayerLobbyData
                    id="player1"
                    canEdit={true}
                    ready={false}
                />
                <PlayerLobbyData
                    id="player2"
                    canEdit={false}
                    ready={true}
                />
                <PlayerLobbyData
                    id="player3"
                    canEdit={false}
                    ready={true}
                />
                <PlayerLobbyData
                    id="player4"
                    canEdit={false}
                    ready={false}
                />
            </div>
        )
    }
}

export default Lobby