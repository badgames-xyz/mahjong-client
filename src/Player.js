import React from 'react';
import Typography from '@material-ui/core/Typography';

import { getIcon, getCard, getHidden } from './Pictures'
import { Button, CardActionArea } from '@material-ui/core';

const borderWidth = 2;
const borderColour = "#264653";

class Player extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            position: this.props.position,
            isTurn: this.props.isTurn,
            actionTurn: this.props.actionTurn,
            playerData: this.props.playerData,

            wWidth: this.props.wWidth,
            wHeight: this.props.wHeight,

            name: this.props.playerData.name,
            iconIndex: this.props.playerData.iconIndex,
            direction: this.props.playerData.direction,
            completed: this.props.playerData.completed,
            score: this.props.playerData.score,

            anySelected: false,
            selectedIndex: -1,
        }

        if (this.state.position === "center") {
            this.state.hand = this.props.playerData.hand;
            this.state.actions = this.props.playerData.actions;
        } else {
            this.state.handSize = this.props.playerData.handSize;
        }
    }

    setFields() {
        this.setState({
            name: this.state.playerData.name,
            iconIndex: this.state.playerData.iconIndex,
            direction: this.state.playerData.direction,
            completed: this.state.playerData.completed,
            score: this.state.playerData.score,

            anySelected: false,
            selectedIndex: -1,
        })

        if (this.state.position === "center") {
            this.setState({
                hand: this.state.playerData.hand,
                actions: this.state.playerData.actions,
            })
        } else {
            this.setState({
                handSize: this.state.playerData.handSize,
            })
        }
    }

    selectCard(index) {
        if (this.state.isTurn) {
            if (this.state.anySelected && this.state.selectedIndex === index) {
                this.setState((prevState) => ({
                    anySelected: !prevState.anySelected,
                    selectedIndex: -1,
                }), () => console.log(this.state.anySelected));
            } else { // another card may or may not be selected
                this.setState({
                    anySelected: true,
                    selectedIndex: index,
                }, () => console.log(this.state.anySelected))
            }
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
        let border = "";
        if (this.state.isTurn || this.state.actionTurn) {
            border = "1px solid gold";
        }
        return (
            <div
                style={{
                    display: "block",
                    textAlign: "center",
                    height: height + "px",
                    border: border,
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
            let cardWidth = (width / 15) - (2 * borderWidth);
            let cardHeight = 1.35 * cardWidth;
            let row = []

            for (let i = 0; i < this.state.hand.length; ++i) {
                let source = getCard(this.state.hand[i].suit, this.state.hand[i].num)
                let actionAreaWidth = cardWidth + (2 * borderWidth);
                let actionAreaHeight = cardHeight + (2 * borderWidth);
                let colour = this.state.selectedIndex === i ? "#E9C46A" : borderColour;
                row.push(
                    <CardActionArea
                        key={i}
                        style={{
                            display: "inline-block",
                            width: actionAreaWidth + "px",
                            height: actionAreaHeight + "px",
                        }}
                        onClick={() => this.selectCard(i)}
                    >
                        <img
                            style={{
                                width: cardWidth + "px",
                                height: cardHeight + "px",
                                border: borderWidth + "px solid " + colour,
                            }}
                            src={source}
                            alt={"Hidden Piece"}
                        />
                    </CardActionArea>
                );
            }

            if (this.state.isTurn && this.state.anySelected) {
                let tcw = cardWidth + (2 * borderWidth); // total card width
                let buttonHeight = 35;
                let buttonWidth = 75;
                let buttonPadding = ((tcw / 2) - (buttonWidth / 2)) + (this.state.selectedIndex * tcw);
                let topPadding = (height - cardHeight - (2 * borderWidth)) / 2 + 4 - buttonHeight;
                let leftPadding = (width - (row.length * (cardWidth + (2 * borderWidth)))) / 2;

                return <div
                    style={{
                        display: "inline-block",
                        width: width + "px",
                        height: height + "px",
                        boxSizing: "border-box",
                        paddingTop: topPadding + "px",
                        paddingLeft: leftPadding + "px",
                    }}
                >
                    <div>
                        <Button
                            style={{
                                height: buttonHeight + "px",
                                width: buttonWidth + "px",
                                marginLeft: buttonPadding + "px",
                                background: "#E9C46A",
                            }}
                            onClick={() => this.props.onDiscard(this.state.selectedIndex)}
                        >
                            Discard
                        </Button>
                    </div>
                    {row}
                </div>
            } else {
                let topPadding = (height - cardHeight - (2 * borderWidth)) / 2 + 4
                let leftPadding = (width - (row.length * (cardWidth + (2 * borderWidth)))) / 2;

                return <div
                    style={{
                        display: "inline-block",
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
                    height: height + "px",
                    width: width + "px",
                    display: "inline-block",
                }}
            >
                <div
                    style={{
                        float: this.state.position,
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
            let cardWidth = (width / 5) - (2 * borderWidth);
            let cardHeight = cardWidth * 1.35;
            if (4 * (cardWidth + (2 * borderWidth)) > width) {
                cardWidth = (width / 4) - (2 * borderWidth);
                cardHeight = cardWidth * 1.35;
            }
            let spacing = (cardWidth + (2 * borderWidth)) / 5;
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

            return (
                <div
                    style={{
                        width: width + "px",
                        height: height + "px",
                        display: "inline-block",
                        verticalAlign: "top",
                        overflowY: "auto",
                    }}
                >
                    {rows.map((x, i) => (
                        <div
                            key={i}
                            style={{
                                paddingLeft: spacing + "px",
                            }}
                        >
                            {x}
                        </div>
                    ))}
                </div>
            )
        }
    }

    createActionArea(width, height) {
        if (this.state.isTurn) {
            let winButtonStyle = {
                width: width + "px",
                background: "#E9C46A",
                marginBottom: "10px",
            }

            return (
                <div
                    style={{
                        width: width + "px",
                        height: height + "px",
                        display: "inline-block",
                        verticalAlign: "top",
                        textAlign: "center",
                    }}
                >
                    <Button
                        style={winButtonStyle}
                    >
                        declare win
                    </Button>
                    <Typography>
                        Or click to discard a card.
                    </Typography>
                </div>
            )
        } else if (this.state.actionTurn && this.state.actions && this.state.actions.length) {
            let takeButtonWidth = 65;
            let takeButtonHeight = 35;

            let cardWidth = ((width - takeButtonWidth) / 4) - (2 * borderWidth);
            let cardHeight = cardWidth * 1.35;

            let rows = []
            for (let j = 0; j < this.state.actions.length; ++j) {
                let row = []
                for (let i = 0; i < this.state.actions[j].cards.length; ++i) {
                    let suit = this.state.actions[j].cards[i].suit;
                    let num = this.state.actions[j].cards[i].num;
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

            let passButtonStyle = {
                width: width + "px",
                background: "#E9C46A",
            }

            let takeButtonStyle = {
                float: "left",
                alignItems: "center",
                width: takeButtonWidth + "px",
                height: takeButtonHeight + "px",
                background: "#E9C46A",
            }

            let buttonTopPadding = (((cardHeight - takeButtonHeight) / 2) + borderWidth);
            let additionalText = ""
            if (row.length === 0) {
                additionalText = <Typography>
                    No actions available.
                </Typography>
            }

            return (
                <div
                    style={{
                        width: width + "px",
                        height: height + "px",
                        display: "inline-block",
                        verticalAlign: "top",
                        overflowY: "auto",
                        textAlign: "center",
                    }}
                >
                    <Button
                        style={passButtonStyle}
                        onClick={() => this.props.onPass()}
                    >
                        Pass
                    </Button>
                    {rows.map((x, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                marginTop: "5px",
                            }}
                        >
                            <div
                                style={{
                                    paddingTop: buttonTopPadding + "px",
                                }}
                            >
                                <Button
                                    style={takeButtonStyle}
                                >
                                    {this.state.actions[i].type}
                                </Button>
                            </div>
                            <div
                                style={{
                                    float: "left",
                                }}
                            >
                                {x}
                            </div>
                        </div>
                    ))}
                    {additionalText}
                </div>
            )
        } else { // may be more cases than 2
            return (
                <div
                    style={{
                        width: width + "px",
                        height: height + "px",
                        verticalAlign: "top",
                        display: "inline-block",
                    }}
                >
                    <Typography>
                        No actions right now.
                    </Typography>
                </div>
            )
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
            completedWidth = width * 0.2;
            completedHeight = height;
            let nameWidth = width * 0.6;
            let nameHeight = 35;
            handWidth = nameWidth;
            handHeight = height - nameHeight;
            let actionWidth = width - completedWidth - handWidth;
            let actionHeight = height;

            return (
                <div
                    style={{
                        width: width + "px",
                        height: height + "px",
                        display: "block",
                    }}
                >
                    {this.createCompleted(completedWidth, completedHeight)}
                    <div
                        style={{
                            display: "inline-block",
                        }}
                    >
                        {this.createHand(handWidth, handHeight)}
                        {this.createNameTag(nameHeight)}
                    </div>
                    
                    {this.createActionArea(actionWidth, actionHeight)} 
                </div>
            )
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.wWidth !== this.props.wWidth) {
            this.setState({ wWidth: this.props.wWidth })
        }
        if (prevProps.wHeight !== this.props.wHeight) {
            this.setState({ wHeight: this.props.wHeight })
        }
        if (prevProps.isTurn !== this.props.isTurn) {
            this.setState({ isTurn: this.props.isTurn })
        }
        if (prevProps.playerData !== this.props.playerData) {
            this.setState({
                playerData: this.props.playerData
            }, () => this.setFields());
        }
    }

    render() {
        const nameHeight = 35; // px

        const cardAreaWidth = this.state.wWidth;
        const cardAreaHeight = this.state.wHeight - nameHeight;

        if (this.state.position === "center") {
            return (
                <div>
                    {this.createCardArea(this.state.wWidth, this.state.wHeight)}
                </div>
            )
        }
        return (
            <div>
                {this.createNameTag(nameHeight)}
                {this.createCardArea(cardAreaWidth, cardAreaHeight)}
            </div>
        )
    }
}

export default Player