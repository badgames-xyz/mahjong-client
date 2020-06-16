import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from 'react-router-dom';

import logo from './images/logoWhite.png'

const barColour = "#264653";

const barStyle = {
    minHeight: "50px",
    backgroundColor: barColour,
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    onClickLogo() {
        this.props.onClickLogo();
    }

    render() {
        return (
            <Toolbar
                style={barStyle}
            >
                <CardActionArea
                    component={Link}
                    to="/mahjong-client/"
                    disableRipple
                >
                    <img
                        style={{
                            width: "150px",
                        }}
                        src={logo}
                        alt="Bad Mahjong"
                        onClick={() => this.onClickLogo()}
                    />
                </CardActionArea>
            </Toolbar>
        )
    }
}

export default NavBar