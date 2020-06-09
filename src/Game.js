import React from 'react';

import NavBar from './NavBar'
import Player from './Player'
import Discard from './Discard'
import GameDisplay from './GameDisplay';

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
    }

    onDiscard(index) {
        let data = { roomCode: this.state.gameData.roomCode, index: index }
        this.state.ws.emit("discard", JSON.stringify(data));
    }

    onPass() {
        let data = { roomCode: this.state.gameData.roomCode, actionIndex: -1 }
        this.state.ws.emit("action", JSON.stringify(data));
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
        const navBarHeight = 50; // px
        const otherAreaHeight = this.state.wHeight - navBarHeight;
        const yourAreaHeight = otherAreaHeight * 0.30;

        const sidePanelWidth = this.state.wWidth * 0.20; // px
        const sidePanelHeight = otherAreaHeight - yourAreaHeight; // px
        const sidePlayerHeight = sidePanelHeight * 0.80; // px

        const centerPanelWidth = this.state.wWidth - (2 * sidePanelWidth); // px
        const centerPanelHeight = sidePanelHeight;

        const topPlayerHeight = otherAreaHeight * 0.20; // px

        console.log(this.state.gameData);
        let d = this.state.gameData.direction.num;
        let turnLeft = d === this.state.playerLeft.direction.num;
        let turnRight = d === this.state.playerRight.direction.num;
        let turnTop = d === this.state.playerTop.direction.num;
        let turnCurrent = d === this.state.playerCurrent.direction.num;

        return (
            <div
                style={{
                    backgroundColor: backgroundColour
                }}
            >
                <NavBar
                    onClickLogo={() => {}}
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
                            <Discard wWidth={centerPanelWidth} wHeight={centerPanelHeight - topPlayerHeight} discard={[{'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 4}, {'suit': "circle", 'num': 3}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7},  {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 4}, {'suit': "circle", 'num': 3}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7},  {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 4}, {'suit': "circle", 'num': 3}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7},  {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 4}, {'suit': "circle", 'num': 3}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7},  {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 4}, {'suit': "circle", 'num': 3}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7},  {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 4}, {'suit': "circle", 'num': 3}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7},  {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}, {'suit': "circle", 'num': 7}]} drawpile={10}/>
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
                                turnType={!this.state.gameData.actionTurn}
                                direction={this.state.gameData.direction}
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
                        wWidth={this.state.wWidth}
                        wHeight={yourAreaHeight}
                        onDiscard={(index) => this.onDiscard(index)}
                        onPass={() => this.onPass()}
                    />
                </div>
            </div>
            
        )
    }
}

export default Game