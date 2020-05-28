import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class LobbyButtons extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ws: this.props.ws,
            isHost: this.props.isHost,
            canStart: this.props.canStart,
            ready: this.props.ready,

            wWidth: 0,
            wHeight: 0,
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    onReady() {
        this.props.onChangeReadyStatus();
    }

    onQuit() {
        console.log("send")
        let msg = {
            type: "join",
            text: "cringe",
        }
        this.state.ws.send(JSON.stringify(msg));
    }

    updateWindowDimensions() {
        this.setState({ wWidth: window.innerWidth, wHeight: window.innerHeight });
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        this.state.ws.addEventListener("message", function(event) {
            console.log(event.data);
        });
    }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.ready !== this.props.ready) {
            this.setState({
                ready: this.props.ready
            })
        }
        if (prevProps.isHost !== this.props.isHost) {
            this.setState({
                isHost: this.props.isHost
            })
        }
        if (prevProps.canStart !== this.props.canStart) {
            this.setState({
                canStart: this.props.canStart
            })
        }
    }

    render() {
        let totalWidth = Math.min(800, this.state.wWidth * 0.52); // in px
        let minTotalWidth = 600; // in px

        let fontSize = 35; // in px
        let buttonWidth = 250; // in px
        let buttonHeight = 100; // in px
        let buttonMargin = (this.state.wWidth - Math.max(totalWidth, minTotalWidth)) / 2 + 25; // in px

        let yellow = "#E9C46A";
        let red = "#E76F51";
        let button;

        if (this.state.isHost) {
            let startButtonText = "Waiting";
            let startButtonColor = "#C4C4C4"; // gray
            let buttonActive = false;
            if (this.state.canStart) {
                startButtonText = "Start";
                startButtonColor = yellow;
                buttonActive = true;
            }

            button = <Button
                variant="contained"
                style={{
                    width: buttonWidth + "px",
                    height: buttonHeight + "px",
                    background: startButtonColor,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
                disabled={!buttonActive}
                // onClick={() => this.onReadyButton()}
            >
                <Typography
                    style={{
                        fontSize: fontSize + "px",
                        color: "black"
                    }}
                    align="center"
                >
                    {startButtonText}
                </Typography>
            </Button>
        } else {
            let readyButtonText = "Ready";
            let readyButtonColor = yellow;
            if (this.state.ready) {
                readyButtonText = "Not Ready";
                readyButtonColor = red;
            }

            button = <Button
                variant="contained"
                style={{
                    width: buttonWidth + "px",
                    height: buttonHeight + "px",
                    background: readyButtonColor,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
                onClick={() => this.onReady()}
            >
                <Typography
                    style={{
                        fontSize: fontSize + "px",
                        color: "black"
                    }}
                    align="center"
                >
                    {readyButtonText}
                </Typography>
            </Button>
        }

        return (
            <div
                style={{
                    width: "100%",
                    minWidth: minTotalWidth + "px",
                    margin: "0 auto",
                    position: "fixed",
                    bottom: "0px",
                }}
            >
                <div
                    style={{
                        margin: "15px 0 25px 0",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <div
                        style={{
                            float: "left",
                            marginLeft: buttonMargin + "px",
                        }}
                    >
                        {button}
                    </div>
                    <div
                        style={{
                            marginLeft: "auto",
                            marginRight: buttonMargin + "px",
                        }}
                    >
                        <Button
                            variant="contained"
                            style={{
                                width: buttonWidth + "px",
                                height: buttonHeight + "px",
                                background: red,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                            onClick={() => this.onQuit()}
                        >
                            <Typography
                                style={{
                                    fontSize: fontSize + "px",
                                    color: "black"
                                }}
                                align="center"
                            >
                                Quit
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LobbyButtons