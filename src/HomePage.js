import React from 'react';
import { Redirect } from 'react-router-dom'

import HomeMenu from './HomeMenu'

import logo from './images/logoBlack.png'
import logoSmall from './images/logoSmall.png'

const backgroundColour = "#2A9D8F"

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ws: this.props.ws,

            lobbyData: null,

            wWidth: 0,
            wHeight: 0,
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    lobbyDataListener = (lobbyData) => {
        this.setState({
            lobbyData: lobbyData
        })
    }

    createRoom() {
        this.state.ws.emit(
            "create",
            JSON.stringify({})
        );

        this.state.ws.on("lobbyData", this.lobbyDataListener)
    }

    updateWindowDimensions() {
        this.setState({ wWidth: window.innerWidth, wHeight: window.innerHeight });
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        this.state.ws.off("lobbyData", this.lobbyDataListener)
    }

    render() {
        const threshold = 1050; // in px
        let source = logo;
        if (this.state.wWidth < threshold) {
            source = logoSmall;
        }
        if (this.state.lobbyData) {
            return (
                <Redirect
                    to={{
                        pathname: '/' + this.state.lobbyData.roomCode,
                        state: {
                            lobbyData: this.state.lobbyData,
                            lobbyMethod: "create",
                        }
                    }}
                />
            )
        }
        return (
            <div
                className="Home"
                style={{
                    width: "100%",
                    minHeight: "100vh",
                    backgroundColor: backgroundColour,
                }}
            >
                <img
                    style={{
                        paddingTop: "50px",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                    src={source}
                    alt="Bad Mahjong"
                />
                <div style={{paddingTop: "20px"}}/>
                <HomeMenu
                    ws={this.state.ws}
                    createRoom={() => this.createRoom()}
                />
            </div>
        );
    }
}

export default Home