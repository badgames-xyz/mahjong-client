import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const barColour = "#264653";
const logoColour = "#FFFFFF";

const barStyle = {
    minHeight: "50px",
    backgroundColor: barColour,
}

const logoStyle = {
    color: logoColour,
}

class NavBar extends React.Component {
    render() {
        return (
            <Toolbar
                style={barStyle}
            >
                <Typography
                    variant="h5"
                    style={logoStyle}
                    // TODO: On click, go back to home page
                >
                    Bad Mahjong
                </Typography>
            </Toolbar>
        )
    }
}

export default NavBar