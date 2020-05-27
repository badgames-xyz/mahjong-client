import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";

import logo from './images/logoWhite.png'


const barColour = "#264653";

const barStyle = {
    minHeight: "50px",
    backgroundColor: barColour,
}

class NavBar extends React.Component {
    onHome() {
        this.context.router.push('/');
    }

    render() {
        return (
            <Toolbar
                style={barStyle}
            >
                <a href="/">
                    <img
                        component={Link}
                        to="/"
                        style={{
                            width: "150px",
                        }}
                        src={logo}
                        alt="Bad Mahjong"
                        onClick={() => this.onHome()}
                    />
                </a>
            </Toolbar>
        )
    }
}

export default NavBar