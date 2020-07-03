import React from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography, Card } from '@material-ui/core';
import { getIcon, getCard } from './Pictures'

class WinModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: this.props.show,
            width: this.props.width,
            height: this.props.height,
            winnerData: this.props.winnerData,
            time: this.props.winnerData.time,
        }
    }

    timer = null;

    setTimer(time) {
        this.setState({
            time: time,
        }, () => {
            clearInterval(this.timer);
            this.timer = null;
            this.timer = setInterval(() => {
                if (this.state.time !== 0) {
                    this.setState((prevState) => ({
                        time: prevState.time - 1,
                    }))
                } else {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            }, 1000)
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.width !== this.props.width) {
            this.setState({
                width: this.props.width
            })
        }
        if (prevProps.height !== this.props.height) {
            this.setState({
                height: this.props.height
            })
        }
    }

    componentDidMount() {
        this.setTimer(this.state.time)
    }

    render() {
        const iconDiameter = 35; // px
        const iconBorderWidth = 2;
        const iconBorderColour = "#264653";
        const nameSize = 40
        let points = "Point";
        if (this.state.winnerData.points > 1) {
            points += "s";
        }
        let total = "Point";
        if (this.state.winnerData.money > 1) {
            total += "s";
        }

        let borderWidth = 2;
        let cardWidthTotal = this.state.width / 18.5;
        let cardWidth = cardWidthTotal - (2 * borderWidth);
        let cardHeight = cardWidth * 1.35;
        let cardHeightTotal = cardHeight + (2 * borderWidth);
        let borderColour = "#264653";
        let hand = [];
        for (let i = 0; i < this.state.winnerData.hand.length; ++i) {
            let source = getCard(this.state.winnerData.hand[i].suit, this.state.winnerData.hand[i].num)
            hand.push(
                <Card
                    key={i}
                    style={{
                        display: "inline-block",
                        width: cardWidthTotal + "px",
                        height: cardHeightTotal + "px",
                    }}
                >
                    <img
                        style={{
                            width: cardWidth + "px",
                            height: cardHeight + "px",
                            border: borderWidth + "px solid " + borderColour,
                        }}
                        src={source}
                        alt={"Tile"}
                    />
                </Card>
            );
        }
        let completed = [];
        for (let i = 0; i < this.state.winnerData.completed.length; ++i) {
            let set = [];
            for (let j = 0; j < this.state.winnerData.completed[i].length; ++j) {
                let source = getCard(this.state.winnerData.completed[i][j].suit, this.state.winnerData.completed[i][j].num)
                set.push(
                    <Card
                        key={i}
                        style={{
                            display: "inline-block",
                            width: cardWidthTotal + "px",
                            height: cardHeightTotal + "px",
                        }}
                    >
                        <img
                            style={{
                                width: cardWidth + "px",
                                height: cardHeight + "px",
                                border: borderWidth + "px solid " + borderColour,
                            }}
                            src={source}
                            alt={"Tile"}
                        />
                    </Card>
                );
            }
            completed.push(set);
        }

        return <Modal
            open={this.state.show}
            // onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Fade in={this.state.show}>
                <div
                    style={{
                        background: "white",
                        width: this.state.width + "px",
                    }}
                >
                    <div
                        style={{
                            height: "35px",
                        }}
                    >
                        <Typography
                            variant="h5"
                            style={{
                                marginLeft: "5px",
                                float: "left",
                            }}
                        >
                            WINNER
                        </Typography>
                        <Typography
                            variant="h5"
                            style={{
                                marginRight: "5px",
                                float: "right",
                            }}
                        >
                            Next game in... {this.state.time}
                        </Typography>
                    </div>
                    <div
                        style={{
                            display: "block",
                        }}
                    >
                        <img
                            style={{
                                width: iconDiameter + "px",
                                height: iconDiameter + "px",
                                borderRadius: "50%",
                                border: iconBorderWidth + "px solid " + iconBorderColour,
                                display: "inline-block",
                                marginLeft: "5px",
                                verticalAlign: "middle",
                            }}
                            src={getIcon(this.state.winnerData.iconIndex)}
                            alt="Avatar Icon"
                        />
                        <Typography
                            style={{
                                fontSize: nameSize + "px",
                                overflow: "hidden",
                                display: "inline-block",
                                marginLeft: "5px",
                                verticalAlign: "middle",
                            }}
                            noWrap={true}
                        >
                            {this.state.winnerData.name}
                        </Typography>
                    </div>
                    <div
                        style={{
                            display: "block",
                        }}
                    >
                        <Typography
                            variant="h4"
                            style={{
                                display: "inline-block",
                                marginLeft: "5px",
                            }}
                        >
                            +{this.state.winnerData.points} {points}
                        </Typography>
                        <Typography
                            variant="h5"
                            style={{
                                display: "inline-block",
                                marginLeft: "20px",
                            }}
                        >
                            {this.state.winnerData.money} {total} total
                        </Typography>
                    </div>
                    <Typography
                        variant="body1"
                        style={{
                            paddingLeft: (cardWidthTotal / 2) + "px",
                        }}
                    >
                        Hand:
                    </Typography>
                    <div
                        style={{
                            paddingLeft: (cardWidthTotal / 2) + "px",
                        }}
                    >
                        {hand}
                    </div>
                    <Typography
                        variant="body1"
                        style={{
                            paddingLeft: (cardWidthTotal / 2) + "px",
                        }}
                    >
                        Completed:
                    </Typography>
                    {completed.map((x, i) => (
                        <div
                            key={i}
                            style={{
                                display: "inline-block",
                                paddingLeft: (cardWidthTotal / 2) + "px",
                            }}
                        >
                            {x}
                        </div>
                    ))}
                </div>
            </Fade>
        </Modal>
    }
}

export default WinModal