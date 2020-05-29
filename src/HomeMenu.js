import React from 'react';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';

const minButtonWidth = 360; // in px
const buttonWidth = 0.25; // in %

const buttonStyle = {
    textTransform: 'none',
    backgroundColor: "#E9C46A",
    width: buttonWidth,
    minWidth: minButtonWidth,
}

const textBoxWidth = 0.15; // in %
const minTextBoxWidth = 216; // in px
const joinButtonWidth = 0.08; // in %
const minJoinButtonWidth = 115; // in px

const textBoxStyle = {
    width: textBoxWidth,
    minWidth: minTextBoxWidth,
}

const joinButtonStyle = {
    textTransform: 'none',
    backgroundColor: "#E9C46A",
    width: joinButtonWidth,
    minWidth: minJoinButtonWidth,
}

class HomeMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomCode: "",
        }
    }

    onClickJoin() {
        this.setState(prevState => ({
            joinPressed: !prevState.joinPressed
        }))
    }

    createDivider() {
        const hrWidth = buttonWidth / 2 - 0.20;
        const minHrWidth = minButtonWidth / 2 - 25;
        const hr = <hr
            style={{
                border: "1px solid black"
            }}
        />
        return (
            <div
                style={{
                    width: buttonWidth,
                    minWidth: minButtonWidth,
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "25px",
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        float: "left",
                        width: hrWidth + "%",
                        minWidth: minHrWidth + "px",
                    }}
                >
                    {hr}
                </div>
                <div
                    style={{
                        // float: "left",
                        // align: "center"
                        margin: "auto",
                    }}
                >
                    <Typography variant="body1">
                        OR
                    </Typography>
                </div>
                <div
                    style={{
                        float: "left",
                        width: hrWidth + "%",
                        minWidth: minHrWidth + "px",
                    }}
                >
                    {hr}
                </div>
            </div>
        )
    }

    onRoomCodeChange = (e) => {
        this.setState({
            roomCode: e.target.value
        });
    }

    createRoom() {
        this.props.createRoom();
    }

    render() {
        return (
            <Container>
                <div
                    style={{
                        paddingTop: "25px",
                        width: buttonWidth,
                        minWidth: minButtonWidth,
                        margin: "0 auto",
                    }}
                >
                    <Button
                        // component={Link}
                        // to="singleplayer"
                        style={buttonStyle}
                        variant="contained"
                    >
                        <Typography variant="h3">
                            Single Player
                        </Typography>
                    </Button>
                </div>
                <div
                    style={{
                        paddingTop: "25px",
                        width: buttonWidth,
                        minWidth: minButtonWidth,
                        margin: "0 auto",
                    }}
                >
                    <Button
                        style={buttonStyle}
                        variant="contained"
                        onClick={() => this.createRoom()}
                    >
                        <Typography variant="h3">
                            Create a Room
                        </Typography>
                    </Button>
                </div>
                {this.createDivider()}
                <div
                    style={{
                        paddingTop: "25px",
                        display: "flex",
                        width: buttonWidth,
                        minWidth: minButtonWidth,
                        margin: "0 auto",
                    }}
                >
                    <div
                        style={{
                            float: "left",
                        }}
                    >
                        <TextField
                            style={textBoxStyle}
                            InputProps={{
                                style: {
                                    fontSize: "27px"
                                }
                            }}
                            InputLabelProps={{
                                style: {
                                    fontSize: "27px"
                                }
                            }}
                            variant="outlined"
                            label="Room Code"
                            onChange={this.onRoomCodeChange}
                        />
                    </div>
                    <div
                        style={{
                            marginLeft: "auto",
                        }}
                    >
                        <Button
                            component={Link}
                            to={"/" + this.state.roomCode}
                            style={joinButtonStyle}
                            variant="contained"
                        >
                            <Typography variant="h3">
                                Join
                            </Typography>
                        </Button>
                    </div>
                    
                </div>
            </Container>
        )
    }
}


export default HomeMenu