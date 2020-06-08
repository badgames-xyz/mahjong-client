import React from 'react';

import { getCard } from './Pictures'
import { Typography } from '@material-ui/core';

const normalLen = 30;
const actionLen = 10;

const width = 50;
const height = width * 1.35;

const borderWidth = 2;
const borderColour = "#F4A261";

class GameDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            turnType: this.props.turnType, // or action, comes from props
            direction: {
                suit: "special",
                num: 1,
            }, // should come from props

            timer: null,
            seconds: this.props.turnType === "normal" ? normalLen : actionLen,

            wWidth: this.props.wWidth,
            wHeight: this.props.wHeight,
        }
    }

    timer = null;

    componentDidMount() {
        this.timer = setInterval(() => {
            if (this.state.seconds !== 0) {
                this.setState((prevState) => ({
                    seconds: prevState.seconds - 1,
                }))
            } else {
                clearInterval(this.timer)
            }
        }, 1000)
    }

    createTimer() {
        let colour = "#264653";
        if (this.state.seconds < 20) {
            colour = "#f4a261";
        }
        if (this.state.seconds < 10) {
            colour = "#A23216";
        }
        return (
            <Typography
                variant="h2"
                style={{
                    color: colour,
                }}
            >
                {this.state.seconds}
            </Typography>
        )
    }

    createDirection() {
        
        return (
            <img
                style={{
                    border: borderWidth + "px solid " + borderColour,
                }}
                width={width + "px"}
                height={height + "px"}
                src={getCard(this.state.direction.suit, this.state.direction.num)}
                alt="Direction Tile"
            />
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.wWidth !== this.props.wWidth) {
            this.setState({ wWidth: this.props.wWidth })
        }
        if (prevProps.wHeight !== this.props.wHeight) {
            this.setState({ wHeight: this.props.wHeight })
        }
    }

    render() {
        let timerPadding = this.state.wWidth - 130;
        if (this.state.seconds < 10) {
            timerPadding += 30
        }
        return (
            <div
                style={{
                    width: this.state.wWidth + "px",
                    height: this.state.wHeight + "px",
                    display: "flex",
                }}
            >
                <div
                    style={{
                        paddingLeft: timerPadding + "px",
                        float: "left",
                    }}
                >
                    {this.createTimer()}
                </div>
                <div
                    style={{
                        marginLeft: "auto",
                    }}
                >
                    {this.createDirection()}
                </div>
            </div>
        )
    }
}

export default GameDisplay