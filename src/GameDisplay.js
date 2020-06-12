import React from 'react';

import { getCard } from './Pictures'
import { Typography } from '@material-ui/core';

const normalLen = 30;
const actionLen = 10;

const width = 50;
const height = width * 1.35;

const borderWidth = 2;
const borderColour = "#F4A261";

const colour1 = "#264653";
const colour2 = "#f4a261";
const colour3 = "#A23216";

class GameDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            turnType: this.props.turnType, // true if normal, false if action turn
            direction: this.props.direction,

            timer: null,
            seconds: this.props.turnType ? normalLen : actionLen,

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
        let threshold1 = 5;
        let threshold2 = 3;
        if (this.state.turnType) {
            threshold1 = 20;
            threshold2 = 10;
        }
        let colour = colour1;
        if (this.state.seconds < threshold1) {
            colour = colour2;
        }
        if (this.state.seconds < threshold2) {
            colour = colour3;
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
        if (prevProps.direction !== this.props.direction) {
            this.setState({ direction: this.props.direction })
        }
        if (prevProps.turnType !== this.props.turnType) {
            this.setState({
                turnType: this.props.turnType,

                timer: null,
                seconds: this.props.turnType ? normalLen : actionLen,
            })
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                if (this.state.seconds !== 0) {
                    this.setState((prevState) => ({
                        seconds: prevState.seconds - 1,
                    }))
                } else {
                    clearInterval(this.timer);
                }
            }, 1000)
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