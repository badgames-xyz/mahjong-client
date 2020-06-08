import React from 'react';

import NavBar from './NavBar'
import Player from './Player'
import Discard from './Discard'

const backgroundColour = "#2A9D8F";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameData: this.props.gameData,

            ws: this.props.ws,

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
        const navBarHeight = 50; // px
        const otherAreaHeight = this.state.wHeight - navBarHeight;
        const yourAreaHeight = otherAreaHeight * 0.30;

        const sidePanelWidth = this.state.wWidth * 0.20; // px
        const sidePanelHeight = otherAreaHeight - yourAreaHeight; // px
        const sidePlayerHeight = sidePanelHeight * 0.80; // px

        const centerPanelWidth = this.state.wWidth - (2 * sidePanelWidth); // px
        const centerPanelHeight = sidePanelHeight;

        const topPlayerHeight = otherAreaHeight * 0.20; // px

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
                                margin: "0 auto"
                            }}
                        >
                            <Player
                                position="top"
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

                        </div>
                        <div
                            style={{
                                height: sidePlayerHeight + "px",
                                margin: "0 auto",
                            }}
                        >
                            <Player
                                position="right"
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
                        wWidth={this.state.wWidth}
                        wHeight={yourAreaHeight}
                    />
                </div>
            </div>
            
        )
    }
}

export default Game