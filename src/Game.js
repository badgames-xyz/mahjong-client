import React from 'react';

import NavBar from './NavBar'
import Player from './Player'
import Discard from './Discard'
import GameDisplay from './GameDisplay';
import WinModal from './WinModal';

const backgroundColour = "#2A9D8F";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameData: this.props.gameData,
            playerRight: this.props.gameData.players[0],
            playerTop: this.props.gameData.players[1],
            playerLeft: this.props.gameData.players[2],
            playerCurrent: this.props.gameData.currentPlayer,

            ws: this.props.ws,

            wWidth: 0,
            wHeight: 0,
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

        this.gameDisplay = React.createRef();
    }

    onDiscard(index) {
        let data = { roomCode: this.state.gameData.roomCode, index: index }
        this.state.ws.emit("discard", JSON.stringify(data));
    }

    onPass() {
        let data = { roomCode: this.state.gameData.roomCode, index: -1 }
        this.state.ws.emit("action", JSON.stringify(data));
    }

    onAction(index) {
        let data = { roomCode: this.state.gameData.roomCode, index: index }
        this.state.ws.emit("action", JSON.stringify(data));
    }

    onTurnAction(index) {
        let data = { roomCode: this.state.gameData.roomCode, index: index }
        this.state.ws.emit("turnAction", JSON.stringify(data));
    }

    onWin() {
        let data = { roomCode: this.state.gameData.roomCode }
        this.state.ws.emit("win", JSON.stringify(data));
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

    componentDidUpdate(prevProps) {
        if (prevProps.gameData !== this.props.gameData) {
            this.setState({
                gameData: this.props.gameData,
                playerRight: this.props.gameData.players[0],
                playerTop: this.props.gameData.players[1],
                playerLeft: this.props.gameData.players[2],
                playerCurrent: this.props.gameData.currentPlayer,
            })

            this.gameDisplay.current.setTimer(this.props.gameData.timeLeft)
        }
    }

    render() {
        const navBarHeight = 50; // px
        const otherAreaHeight = this.state.wHeight - navBarHeight;
        const yourAreaHeight = otherAreaHeight * 0.30;

        const sidePanelWidth = this.state.wWidth * 0.20; // px
        const sidePanelHeight = otherAreaHeight - yourAreaHeight; // px
        const sidePlayerHeight = sidePanelHeight * 0.80; // px

        const centerPanelWidth = this.state.wWidth - (2 * sidePanelWidth); // px
        const centerPanelHeight = sidePanelHeight;

        const topPlayerHeight = otherAreaHeight * 0.20; // px

        let turnLeft = false;
        let turnRight = false;
        let turnTop = false;
        let turnCurrent = false;
        if (!this.state.gameData.actionTurn) {
            let d = this.state.gameData.turn.num;
            turnLeft = d === this.state.playerLeft.direction.num;
            turnRight = d === this.state.playerRight.direction.num;
            turnTop = d === this.state.playerTop.direction.num;
            turnCurrent = d === this.state.playerCurrent.direction.num;
        }

        let winDialog = false;
        if (this.state.gameData.winner) {
            winDialog = true;
        }

        return (
            <div
                style={{
                    backgroundColor: backgroundColour,
                    overflow: "hidden",
                }}
            >
                <NavBar
                    onClickLogo={() => {}}
                />
                <WinModal
                    show={winDialog}
                    winnerData={this.state.gameData.winner}
                    width={this.state.wWidth * 0.7}
                />
                <div
                    style={{
                        width: this.state.wWidth + "px",
                        height: (otherAreaHeight - yourAreaHeight) + "px",
                        display: "flex",
                    }}
                >
                    <div // left panel
                        style={{
                            width: sidePanelWidth + "px",
                            height: sidePanelHeight + "px",
                            float: "left",
                        }}
                    >
                        <div
                            style={{
                                height: (sidePanelHeight - sidePlayerHeight) + "px",
                            }}
                        >

                        </div>
                        <div
                            style={{
                                height: sidePlayerHeight + "px",
                            }}
                        >
                            <Player
                                position="left"
                                playerData={this.state.playerLeft}
                                isTurn={turnLeft}
                                actionTurn={this.state.gameData.actionTurn}
                                wWidth={sidePanelWidth}
                                wHeight={sidePlayerHeight}
                            />
                        </div>
                    </div>
                    <div // middle panel
                        style={{
                            width: centerPanelWidth + "px",
                            height: centerPanelHeight + "px",
                            float: "left",
                        }}
                    >
                        <div
                            style={{
                                height: topPlayerHeight + "px",
                                margin: "0 auto",
                            }}
                        >
                            <Player
                                position="top"
                                playerData={this.state.playerTop}
                                isTurn={turnTop}
                                actionTurn={this.state.gameData.actionTurn}
                                wWidth={centerPanelWidth}
                                wHeight={topPlayerHeight}
                            />
                        </div>
                        <div
                            style={{
                                height: (centerPanelHeight - topPlayerHeight) + "px",
                                overflow: "auto"
                            }}
                        >
                            <Discard
                                wWidth={centerPanelWidth}
                                wHeight={centerPanelHeight - topPlayerHeight}
                                discard={this.state.gameData.discardPile}
                                drawpile={this.state.gameData.drawPile}
                            />
                        </div>
                    </div>
                    <div // right panel
                        style={{
                            width: sidePanelWidth + "px",
                            height: sidePanelHeight + "px",
                            float: "left",
                        }}
                    >
                        <div
                            style={{
                                height: (sidePanelHeight - sidePlayerHeight) + "px",
                            }}
                        >
                            <GameDisplay
                                ref={this.gameDisplay}
                                turnType={!this.state.gameData.actionTurn}
                                time={this.state.gameData.timeLeft}
                                direction={this.state.gameData.direction}
                                newGame={this.state.gameData.newGame}
                                wWidth={sidePanelWidth}
                                wHeight={sidePanelHeight - sidePlayerHeight}
                            />
                        </div>
                        <div
                            style={{
                                height: sidePlayerHeight + "px",
                                margin: "0 auto",
                            }}
                        >
                            <Player
                                position="right"
                                playerData={this.state.playerRight}
                                isTurn={turnRight}
                                actionTurn={this.state.gameData.actionTurn}
                                wWidth={sidePanelWidth}
                                wHeight={sidePlayerHeight}
                            />
                        </div>
                    </div> 
                </div>
                <div
                    style={{
                        width: this.state.wWidth + "px",
                        height: yourAreaHeight + "px",
                    }}
                >
                    <Player
                        position="center"
                        playerData={this.state.playerCurrent}
                        isTurn={turnCurrent}
                        actionTurn={this.state.gameData.actionTurn}
                        wWidth={this.state.wWidth}
                        wHeight={yourAreaHeight}
                        onDiscard={(index) => this.onDiscard(index)}
                        onPass={() => this.onPass()}
                        onAction={(index) => this.onAction(index)}
                        onTurnAction={(index) => this.onTurnAction(index)}
                        onWin={() => this.onWin()}
                    />
                </div>
            </div>
            
        )
    }
}

export default Game