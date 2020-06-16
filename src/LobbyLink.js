import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import copy from 'copy-to-clipboard'; // needed for safari

const copyButtonColour = "#C4C4C4";

class LobbyLink extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            link: this.props.link,

            wWidth: 0,
            wHeight: 0,
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.onCopy = this.onCopy.bind(this);
    }

    onCopy() {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(this.state.link);
        } else {
            copy(this.state.link);
        }
    };
      
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

        const height = 40; // in px
        const copyButtonWidth = 80; // in px
        const linkBoxWidth = Math.max(totalWidth, minTotalWidth) - copyButtonWidth;

        return (
            <div
                style={{
                    width: totalWidth + "px",
                    minWidth: minTotalWidth + "px",
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        margin: "15px 0 15px 0",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <div
                        style={{
                            float: "left",
                        }}
                    >
                        <Paper
                            variant="outlined"
                            style={{
                                width: linkBoxWidth + "px",
                                height: height + "px",
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: "25px",
                                    overflow: "hidden",
                                }}
                                align="center"
                            >
                                {this.state.link}
                            </Typography>
                        </Paper>
                    </div>
                    <div
                        style={{
                            marginLeft: "auto",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation={true}
                            style={{
                                width: copyButtonWidth + "px",
                                height: (height + 2) + "px",
                                background: copyButtonColour,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                            onClick={this.onCopy}
                        >
                            <Typography
                                style={{
                                    fontSize: "20px",
                                    color: "black"
                                }}
                                align="center"
                            >
                                Copy
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LobbyLink