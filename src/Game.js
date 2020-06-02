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
        const yourAreaHeight = this.state.wHeight * 0.25;
        const otherAreaHeight = this.state.wHeight - (yourAreaHeight + navBarHeight);

        const sidePanelWidth = this.state.wWidth * 0.20; // px
        const centerPanelWidth = this.state.wWidth - (2 * sidePanelWidth); // px

        return (
            <div>
                <NavBar
                    onClickLogo={() => {}}
                />
                <div
                    style={{
                        width: "100%",
                        height: otherAreaHeight + "px",
                        background: "gray",
                        display: "flex",
                    }}
                >
                    <div // left panel
                        style={{
                            width: sidePanelWidth + "px",
                            height: "100%",
                            float: "left",
                            background: "#669999"
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "20%",
                                background: "#996633"
                            }}
                        >

                        </div>
                        <div
                            style={{
                                width: "100%",
                                height: "80%",
                                background: "#d96633"
                            }}
                        >
                            <Player
                                position="left"
                            />
                        </div>
                    </div>
                    <div // middle panel
                        style={{
                            width: centerPanelWidth + "px",
                            height: "100%",
                            float: "left",
                            background: "#869999"
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "30%",
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
                                width: "100%",
                                height: "70%",
                                background: "#260066"
                            }}
                        >

                        </div>
                    </div>
                    <div // right panel
                        style={{
                            width: sidePanelWidth + "px",
                            height: "100%",
                            float: "left",
                            background: "#a69999"
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "20%",
                                background: "#196633"
                            }}
                        >

                        </div>
                        <div
                            style={{
                                width: "100%",
                                height: "80%",
                                background: "#596633"
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
                        width: "100%",
                        height: yourAreaHeight + "px",
                        background: "#269999"
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