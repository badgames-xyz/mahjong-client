import React from 'react';
import HomeMenu from './HomeMenu'

import logo from './images/logoBlack.png'
import logoSmall from './images/logoSmall.png'

const backgroundColour = "#2A9D8F"

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        const threshold = 1050; // in px
        let source = logo;
        if (this.state.wWidth < threshold) {
            source = logoSmall;
        }
        return (
            <div
                className="Home"
                style={{
                    width: "100%",
                    height: "100vh",
                    backgroundColor: backgroundColour,
                }}
            >
                <img
                    style={{
                        paddingTop: "50px",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                    src={source}
                    alt="Bad Mahjong"
                />
                <div style={{paddingTop: "20px"}}/>
                <HomeMenu/>
            </div>
        );
    }
}

export default Home