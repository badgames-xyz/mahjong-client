import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';

import logo from './images/logoWhite.png'

const barColour = "#264653";

const barStyle = {
    minHeight: "50px",
    backgroundColor: barColour,
}

class NavBar extends React.Component {
    render() {
        return (
            <Toolbar
                style={barStyle}
            >
                <a href="/">
                    <img
                        style={{
                            width: "150px",
                        }}
                        src={logo}
                        alt="Bad Mahjong"
                    />
                </a>
            </Toolbar>
        )
    }
}

export default NavBar