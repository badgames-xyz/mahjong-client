import React from 'react';

import NavBar from './NavBar'
import Player from './Player'

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
        const yourAreaHeight = otherAreaHeight * 0.25;

        const sidePanelWidth = this.state.wWidth * 0.20; // px
        const sidePanelHeight = otherAreaHeight - yourAreaHeight; // px
        const sidePlayerHeight = sidePanelHeight * 0.80; // px

        const centerPanelWidth = this.state.wWidth - (2 * sidePanelWidth); // px
        const centerPanelHeight = sidePanelHeight;

        const topPlayerHeight = otherAreaHeight * 0.20; // px

        return (
            <div>
                <NavBar
                    onClickLogo={() => {}}
                />
                <div
                    style={{
                        width: this.state.wWidth + "px",
                        height: (otherAreaHeight - yourAreaHeight) + "px",
                        background: "gray",
                        display: "flex",
                    }}
                >
                    <div // left panel
                        style={{
                            width: sidePanelWidth + "px",
                            height: sidePanelHeight + "px",
                            float: "left",
                            background: "#669999"
                        }}
                    >
                        <div
                            style={{
                                height: (sidePanelHeight - sidePlayerHeight) + "px",
                                background: "#996633"
                            }}
                        >

                        </div>
                        <div
                            style={{
                                height: sidePlayerHeight + "px",
                                background: "#d96633"
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
                            background: "#869999"
                        }}
                    >
                        <div
                            style={{
                                height: topPlayerHeight + "px",
                                background: "#660066",
                                margin: "0 auto"
                            }}
                        >
                            <Player
                                position="top"
                            />
                        </div>
                        <div
                            style={{
                                height: (centerPanelHeight - topPlayerHeight) + "px",
                                background: "#260066"
                            }}
                        >

                        </div>
                    </div>
                    <div // right panel
                        style={{
                            width: sidePanelWidth + "px",
                            height: sidePanelHeight + "px",
                            float: "left",
                            background: "#a69999",
                            border: "1px black",
                        }}
                    >
                        <div
                            style={{
                                height: (sidePanelHeight - sidePlayerHeight) + "px",
                                background: "#196633"
                            }}
                        >

                        </div>
                        <div
                            style={{
                                height: sidePlayerHeight + "px",
                                margin: "0 auto",
                                background: "#596633",
                                border: "1px black",
                            }}
                        >
                            <Player
                                position="right"
                            />
                        </div>
                    </div> 
                </div>
                <div
                    style={{
                        width: this.state.wWidth + "px",
                        height: yourAreaHeight + "px",
                        background: "#269999",
                        border: "1px black",
                    }}
                >
                    <Player
                        position="center"
                    />
                </div>
            </div>
            
        )
    }
}

export default Game