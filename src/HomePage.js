import React from 'react';
import Typography from '@material-ui/core/Typography';
import HomeMenu from './HomeMenu'

const backgroundColour = "#2A9D8F"
function Home() {
    return (
        <div
            className="Home"
            style={{
                width: "100%",
                height: "100vh",
                backgroundColor: backgroundColour,
            }}
        >
            <Typography
                style={{
                    paddingTop: "75px",
                    fontSize:"10rem"
                }}
                align="center"
            >
                Bad Mahjong
            </Typography>
            <div style={{paddingTop: "50px"}}/>
            <HomeMenu/>
        </div>
    );
}

export default Home