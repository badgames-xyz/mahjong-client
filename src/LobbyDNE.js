import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import NavBar from './NavBar'
import { Link } from 'react-router-dom';

const backgroundColour = "#2A9D8F"

const minButtonWidth = 360; // in px
const buttonWidth = 0.25; // in %

const buttonStyle = {
    textTransform: 'none',
    backgroundColor: "#E9C46A",
    width: buttonWidth,
    minWidth: minButtonWidth,
}

class LobbyDNE extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div
                className="Home"
                style={{
                    width: "100%",
                    height: "100vh",
                    backgroundColor: backgroundColour,
                }}
            >
                <NavBar
                    onClickLogo={() => {}}
                />
                <div style={{paddingTop: "15%"}}/>
                <div
                    style={{
                        textAlign: "center"
                    }}
                >
                    <Typography
                        variant="h4">
                        Lobby Does Not Exist
                    </Typography>
                </div>
                <div style={{paddingTop: "20px"}}/>
                <div
                    style={{
                        paddingTop: "25px",
                        width: buttonWidth,
                        minWidth: minButtonWidth,
                        margin: "0 auto",
                    }}
                >
                    <Button
                        component={Link}
                        to="/mahjong-client/"
                        style={buttonStyle}
                        variant="contained"
                    >
                        <Typography variant="h3">
                            Home
                        </Typography>
                    </Button>
                </div>
            </div>
        )
    }
}

export default LobbyDNE