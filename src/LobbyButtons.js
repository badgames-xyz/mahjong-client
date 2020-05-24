import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class LobbyButtons extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wWidth: 0,
            wHeight: 0,
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
    }

    render() {
        let totalWidth = Math.min(800, this.state.wWidth * 0.52); // in px
        let minTotalWidth = 600; // in px

        let fontSize = 40; // in px
        let buttonWidth = 250; // in px
        let buttonHeight = 100; // in px
        let buttonMargin = (this.state.wWidth - Math.max(totalWidth, minTotalWidth)) / 2 + 25; // in px

        let yellow = "#E9C46A";
        let red = "#E76F51";

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
                        <Button
                            variant="contained"
                            style={{
                                width: buttonWidth + "px",
                                height: buttonHeight + "px",
                                background: yellow,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                            onClick={this.onCopy}
                        >
                            <Typography
                                style={{
                                    fontSize: fontSize + "px",
                                    color: "black"
                                }}
                                align="center"
                            >
                                Ready
                            </Typography>
                        </Button>
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
                            onClick={this.onCopy}
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