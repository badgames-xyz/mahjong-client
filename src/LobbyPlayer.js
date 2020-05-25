import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import yuta from './images/icons/ghettoyuta.png'
import poggers from './images/icons/poggers.png'
import rila from './images/icons/rila.png'
import yessir from './images/icons/yessir.png'

const iconBorderColour = "#264653";
const iconBorderWidth = 2; // in px
const iconDiameter = 100; // in px

const nameFontSize = 30; // in px

const statusBarWidth = 160; // in px
const statusBarHeight = 60; // in px
const statusBarFontSize = 25; // in px

const notReadyColour = "#FFADAD"; // #E76F51
const readyColour = "#FDFFB6"; // #FDFFB6 E9C46A

const names = [
    "Half Pounder",
    "Medium Mac",
    "Small Mac",
    "Senior Chicken",
    "Snacc Wrap",
    "Sad Meal",
    "Broiled Apple Pie",
    "Chicken Nuggies",
    "Triple Cheeseburger",  
    "Dinner Sandwich",
]

const icons = [
    yuta,
    poggers,
    rila,
    yessir,
]

class LobbyPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            canEdit: this.props.canEdit,
            icon: this.randomIcon(),
            name: this.props.name,
            ready: this.props.ready,
            isHost: this.props.isHost,

            wWidth: 0,
            wHeight: 0,
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    randomIcon() {
        // return a random avatar icon
        return icons[Math.floor(Math.random() * icons.length)]
    }

    randomName() {
        // return a random name
        return names[Math.floor(Math.random() * names.length)]
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

    componentDidUpdate(prevProps) {
        if (prevProps.ready !== this.props.ready) {
            this.setState({
                ready: this.props.ready
            })
        }
    }

    render() {
        let statusText = "Not Ready";
        let statusColour = notReadyColour;
        if (this.state.ready) {
            statusText = "Ready";
            statusColour = readyColour;
        }
        let status = <Paper
            variant="outlined"
            style={{
                width: statusBarWidth + "px",
                height: statusBarHeight + "px",
                background: statusColour,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Typography
                style={{
                    fontSize: statusBarFontSize + "px",
                }}
                align="center"
            >
                {statusText}
            </Typography>
        </Paper>

        let editButton = "";
        if (this.state.canEdit) {
            editButton = <IconButton>
                <EditIcon fontSize="large"/>
            </IconButton>
        }

        let totalWidth = Math.min(800, this.state.wWidth * 0.52); // in px
        let minTotalWidth = 600; // in px

        const namePadding = 15; // in px
        let widthRemaining = iconDiameter + (2 * (iconBorderWidth + namePadding)) + statusBarWidth + 2;
        let nameWidth = Math.max(totalWidth, minTotalWidth) - widthRemaining;
        if (this.state.canEdit) {
            nameWidth = Math.max(totalWidth, minTotalWidth) - (widthRemaining + 59);
        }

        return (
            <div
                style={{
                    width: totalWidth + "px",
                    minWidth: minTotalWidth + "px",
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        margin: "15px 0 15px 0",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <div
                        style={{
                            float: "left",
                        }}
                    >
                        <img
                            style={{
                                width: iconDiameter + "px",
                                height: iconDiameter + "px",
                                borderRadius: "50%",
                                border: iconBorderWidth + "px solid " + iconBorderColour
                            }}
                            src={this.state.icon}
                            alt="Avatar Icon"
                        />
                    </div>
                    <div
                        style={{
                            float: "left",
                            maxWidth: nameWidth + "px",
                            marginLeft: namePadding + "px",
                            marginRight: namePadding + "px"
                        }}
                    >
                        <Typography
                            style={{
                                fontSize: nameFontSize + "px",
                                overflow: "hidden"
                            }}
                            noWrap={true}
                        >
                            {this.state.name}
                        </Typography>
                    </div>
                    <div
                        style={{
                            float: "left"
                        }}
                    >
                        {editButton}
                    </div>
                    <div
                        style={{
                            marginLeft: "auto",
                        }}
                    >
                        {status}
                    </div>
                </div>
            </div>
        )
    }
}

export default LobbyPlayer