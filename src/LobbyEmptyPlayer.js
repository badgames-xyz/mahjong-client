import React from 'react';
import { Typography, Button } from '@material-ui/core';

class LobbyEmptyPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wWidth: this.props.wWidth,
            wHeight: this.props.wHeight,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.wWidth !== this.props.wWidth) {
            this.setState({
                wWidth: this.props.wWidth
            })
        }
        if (prevProps.wHeight !== this.props.wHeight) {
            this.setState({
                wHeight: this.props.wHeight
            })
        }
    }

    render() {
        let height = 75; // total height

        let totalWidth = Math.min(800, this.state.wWidth * 0.52); // in px
        let minTotalWidth = 600; // in px

        let textSize = 25;
        
        let lineHeight = 40;

        return (
            <div
                style={{
                    width: totalWidth + "px",
                    height: height + "px",
                    minWidth: minTotalWidth + "px",
                    margin: "0 auto",
                    borderTop: "1px solid #264653",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Typography
                        variant="overline"
                        style={{
                            fontSize: textSize + "px",
                            float: "left",
                            verticalAlign: "middle",
                        }}
                    >
                        Invite a friend
                    </Typography>
                    <div
                        style={{
                            height: lineHeight + "px",
                            borderLeft: "1px solid #264653",
                            display: "left",
                            margin: "0 25px 0 25px",
                        }}
                    ></div>
                    <Button
                        style={{
                            background: "#264653",
                        }}
                        disabled={true}
                    >
                        <Typography
                            style={{
                                color: "white",
                            }}
                        >
                            ADD BOT
                        </Typography>
                    </Button>
                </div>
            </div>
        )
    }
}

export default LobbyEmptyPlayer