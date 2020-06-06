import React from 'react';
import Typography from '@material-ui/core/Typography';

import { getIcon, getCard, getHidden } from './Pictures'

const borderWidth = 2;
const borderColour = "#264653";

class Player extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            position: this.props.position, // center, left, right, top
            name: "Test Name", // should come from props
            iconIndex: 1, // should come from props
            direction: { suit: "special", num: 1 }, // should come from props
            completed: [
                [
                    {
                        suit: "char",
                        num: 3,
                    },
                    {
                        suit: "char",
                        num: 3,
                    },
                    {
                        suit: "char",
                        num: 3,
                    },
                    {
                        suit: "char",
                        num: 3,
                    }
                ],
                [
                    {
                        suit: "stick",
                        num: 5,
                    },
                    {
                        suit: "stick",
                        num: 6,
                    },
                    {
                        suit: "stick",
                        num: 7,
                    }
                ]
            ], // should come from props
            score: 0, // should come from props

            wWidth: this.props.wWidth,
            wHeight: this.props.wHeight,
        }

        if (this.state.position === "center") {
            this.state.hand = [
                {
                    suit: "circle",
                    num: 7,
                },
                {
                    suit: "stick",
                    num: 5,
                },
                {
                    suit: "char",
                    num: 3,
                },
                {
                    suit: "char",
                    num: 2,
                },
                {
                    suit: "char",
                    num: 1,
                },
                {
                    suit: "char",
                    num: 9,
                },
                {
                    suit: "stick",
                    num: 5,
                },
                {
                    suit: "special",
                    num: 7,
                },
                {
                    suit: "stick",
                    num: 8,
                },
                {
                    suit: "stick",
                    num: 2,
                },
                {
                    suit: "special",
                    num: 2,
                },
                {
                    suit: "circle",
                    num: 4,
                },
                {
                    suit: "special",
                    num: 7,
                },
            ];
        } else {
            this.state.handSize = 13 // should come from this.props.handSize;
        }
    }

    createDirection() {
        const height = 25; // px
        const width = height * 0.75; // px
        const borderWidth = 2;
        const borderColour = "#264653";
        return <img
            style={{
                width: width + "px",
                height: height + "px",
                border: borderWidth + "px solid " + borderColour,
                // float: "left",
                display: "inline-block",
                verticalAlign: "middle",
            }}
            src={getCard(this.state.direction.suit, this.state.direction.num)}
            alt={this.state.direction}
        />
    }

    createIcon() {
        const iconDiameter = 25; // px
        const iconBorderWidth = 2;
        const iconBorderColour = "#264653";
        return <img
            style={{
                width: iconDiameter + "px",
                height: iconDiameter + "px",
                borderRadius: "50%",
                border: iconBorderWidth + "px solid " + iconBorderColour,
                display: "inline-block",
                marginLeft: "5px",
                verticalAlign: "middle",
            }}
            src={getIcon(this.state.iconIndex)}
            alt="Avatar Icon"
        />
    }

    createName() {
        const fontSize = 20;
        return <Typography
            style={{
                fontSize: fontSize + "px",
                overflow: "hidden",
                display: "inline-block",
                marginLeft: "5px",
                verticalAlign: "middle",
            }}
            noWrap={true}
        >
            {this.state.name}
        </Typography>
    }

    createNameTag(height) {
        return (
            <div
                style={{
                    display: "block",
                    textAlign: "center",
                    border: "2px solid black",
                    height: height + "px",
                }}
            >
                {this.createDirection()}
                {this.createIcon()}
                {this.createName()}
            </div>
        )
    }

    createHand(width, height) {
        const createCard = (key, source, w, h) => {
            return <div
                key={key}
                style={{
                    marginTop: "-4px",
                }}
            >
                <img
                    style={{
                        width: w + "px",
                        height: h + "px",
                        border: borderWidth + "px solid " + borderColour,
                    }}
                    src={source}
                    alt={"Hidden Piece"}
                />
            </div>
        }

        if (this.state.position === "center") {
            const handAreaWidth = width * 0.60;
            let cardWidth = (handAreaWidth / 13) - (2 * borderWidth);
            let cardHeight = 1.35 * cardWidth;
            let row = []

            for (let i = 0; i < this.state.hand.length; ++i) {
                let source = getCard(this.state.hand[i].suit, this.state.hand[i].num)
                row.push(
                    <div
                        key={i}
                        style={{
                            display: "inline-block",
                        }}
                    >
                        {createCard(i, source, cardWidth, cardHeight)}
                    </div>
                );
            }

            let topMargin = (height - cardHeight - (2 * borderWidth)) / 2 + 4

            return <div
                style={{
                    display: "block",
                    margin: "0 auto",
                    marginTop: topMargin + "px",
                }}
            >
                {row}
            </div>
        } else if (this.state.position === "left" || this.state.position === "right") {
            let cardWidth = 30;
            let cardHeight = 40;
            let firstCol = []
            let secondCol = []
            const colLim = 7;
            let firstLen = Math.round(this.state.handSize / 2);
            let secondLen = this.state.handSize - firstLen;

            let cardPadding = (width - (2 * (cardWidth + (2 * borderWidth)))) / 3; // px
            if (this.state.handSize === colLim) {
                firstLen = colLim;
                secondLen = 0;
                cardPadding = (width - (cardWidth + (2 * borderWidth))) / 2;
            }

            const leftPadding = this.state.position === "left" ? cardPadding : 0;
            const rightPadding = this.state.position === "right" ? cardPadding : 0;
            const firstTopMargin = (height - (firstLen * (cardHeight + (2 * borderWidth)))) / 2; // px
            const secondTopMargin = (height - (secondLen * (cardHeight + (2 * borderWidth)))) / 2; // px


            for (let i = 0; i < firstLen; ++i) {
                firstCol.push(
                    createCard(i, getHidden(this.state.position), cardWidth, cardHeight)
                );
            }
            for (let i = 0; i < secondLen; ++i) {
                secondCol.push(
                    createCard(i, getHidden(this.state.position), cardWidth, cardHeight)
                );
            }

            return <div
                style={{
                    float: this.state.position,
                    // position: "relative",
                    height: height + "px",
                    width: width + "px",
                    // border: "2px solid black"
                    display: "inline-block",
                }}
            >
                <div
                    style={{
                        float: this.state.position,
                        // verticalAlign: "center",
                        paddingLeft: leftPadding + "px",
                        paddingRight: rightPadding + "px",
                        marginTop: firstTopMargin + "px",
                    }}
                >
                    {firstCol}
                </div>
                <div
                    style={{
                        float: this.state.position,
                        paddingLeft: leftPadding + "px",
                        paddingRight: rightPadding + "px",
                        marginTop: secondTopMargin + "px",
                    }}
                >
                    {secondCol}
                </div>
            </div>
        } else if (this.state.position === "top") {
            let cardWidth = Math.min(((width - 20) / 13) - (2 * borderWidth), 40);
            let cardHeight = (3 / 4) * cardWidth;
            let row = []
            let source = getHidden(this.state.position);
            for (let i = 0; i < this.state.handSize; ++i) {
                row.push(
                    <img
                        key={i}
                        style={{
                            width: cardWidth + "px",
                            height: cardHeight + "px",
                            border: borderWidth + "px solid " + borderColour,
                        }}
                        src={source}
                        alt={"Hidden Piece"}
                    />
                );
            }

            let topPadding = height - cardHeight - (2 * borderWidth);
            let leftPadding = (width - (this.state.handSize * (cardWidth + (2 * borderWidth)))) / 2;

            return <div
                style={{
                    width: width + "px",
                    height: height + "px",
                    boxSizing: "border-box",
                    paddingTop: topPadding + "px",
                    paddingLeft: leftPadding + "px",
                }}
            >
                {row}
            </div>
        }
    }

    createCompleted(width, height) {
        if (this.state.position === "top") {
            // let topPadding = 15;
            let cardWidth = Math.min((width - (37 * borderWidth)) / 19.5, 35)
            let cardHeight = cardWidth * 1.35
            if (cardHeight + (2 * borderWidth) > height) {
                cardHeight = height - (2 * borderWidth)
                cardWidth = cardHeight / 1.35;
            }

            let rows = []
            for (let j = 0; j < this.state.completed.length; ++j) {
                let row = []
                for (let i = 0; i < this.state.completed[j].length; ++i) {
                    let suit = this.state.completed[j][i].suit;
                    let num = this.state.completed[j][i].num;
                    let source = getCard(suit, num)
                    row.push(
                        <img
                            key={i}
                            style={{
                                width: cardWidth + "px",
                                height: cardHeight + "px",
                                border: borderWidth + "px solid " + borderColour,
                            }}
                            src={source}
                            alt={"Hidden Piece"}
                        />
                    )
                }
                rows.push(row);
            }

            let leftPadding = (cardWidth + (2 * borderWidth)) / 2;
            let topPadding = height - (cardHeight + (2 * borderWidth));

            return (
                <div
                    style={{
                        width: width + "px",
                        height: height + "px",
                        display: "block",
                        boxSizing: "border-box",
                    }}
                >
                    {rows.map((x, i) => (
                        <div
                            key={i}
                            style={{
                                display: "inline-block",
                                paddingLeft: leftPadding + "px",
                                paddingTop: topPadding + "px",
                            }}
                        >
                            {x}
                        </div>
                    ))}
                </div>
            )
        } else if (this.state.position === "left" || this.state.position === "right") {
            let cardWidth = (width / 5) - (2 * borderWidth);
            let cardHeight = 1.35 * cardWidth;
            let rows = []
            for (let j = 0; j < this.state.completed.length; ++j) {
                let row = []
                for (let i = 0; i < this.state.completed[j].length; ++i) {
                    let suit = this.state.completed[j][i].suit;
                    let num = this.state.completed[j][i].num;
                    let source = getCard(suit, num)
                    row.push(
                        <img
                            key={i}
                            style={{
                                width: cardWidth + "px",
                                height: cardHeight + "px",
                                border: borderWidth + "px solid " + borderColour,
                            }}
                            src={source}
                            alt={"Hidden Piece"}
                        />
                    )
                }
                rows.push(row);
            }

            let leftPadding = this.state.position === "left" ? cardWidth + (2 * borderWidth) : 0;

            return (
                <div
                    style={{
                        width: width + "px",
                        height: height + "px",
                        display: "inline-block",
                    }}
                >
                    {rows.map((x, i) => (
                        <div
                            key={i}
                            style={{
                                paddingTop: "15px",
                                paddingLeft: leftPadding + "px",
                            }}
                        >
                            {x}
                        </div>
                    ))}
                </div>
            )
        } else if (this.state.position === "center") {

        }
    }

    createCardArea(width, height) {
        let handWidth = Math.round(width * 0.4); // px
        let handHeight = height; // px

        let completedWidth = width - handWidth; // px
        let completedHeight = handHeight; // px

        if (this.state.position === "top") {
            handWidth = width;
            handHeight = height * 0.4;
            completedWidth = width;
            completedHeight = height - handHeight;
        }

        if (this.state.position === "top") {
            return (
                <div
                    style={{
                        width: width + "px",
                        height: height + "px",
                    }}
                >
                    {this.createHand(handWidth, handHeight)}
                    {this.createCompleted(completedWidth, completedHeight)}
                </div>
            )
        } else if (this.state.position === "left") {
            return (
                <div
                    style={{
                        width: width + "px",
                        height: height + "px",
                        display: "block",
                    }}
                >
                    {this.createHand(handWidth, handHeight)}
                    {this.createCompleted(completedWidth, completedHeight)}
                </div>
            )
        } else if (this.state.position === "right") {
            return (
                <div
                    style={{
                        width: width + "px",
                        height: height + "px",
                    }}
                >
                    {this.createCompleted(completedWidth, completedHeight)}
                    {this.createHand(handWidth, handHeight)}
                </div>
            )
        } else if (this.state.position === "center") {

        }
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
        const nameHeight = 35; // px

        const cardAreaWidth = this.state.wWidth;
        const cardAreaHeight = this.state.wHeight - nameHeight;

        return (
            <div>
                <div
                    style={{
                        height: nameHeight + "px",
                    }}
                >
                    {this.createNameTag(nameHeight)}
                </div>
                {this.createCardArea(cardAreaWidth, cardAreaHeight)}
            </div>
        )
    }
}

export default Player