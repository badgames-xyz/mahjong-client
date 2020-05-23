import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import Icon1 from './images/icons/ghettoyuta.png'

const totalWidth = 0.52; // a percentage

const iconBorderColour = "#264653";
const iconBorderWidth = 2; // in px
const iconDiameter = 100; // in px

const nameFontSize = 30; // in px

const statusBarWidth = 160; // in px
const statusBarHeight = 60; // in px
const statusBarFontSize = 25; // in px

const notReadyColour = "#E76F51";
const readyColour = "#E9C46A";

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
    Icon1,
]

class PlayerLobbyData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            canEdit: this.props.canEdit,
            icon: this.randomIcon(),
            name: this.randomName(),
            ready: this.props.ready,

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

        const nameLeftPadding = 0.03; // a percentage
        let totalMinWidth = 323; // in px
        let nameWidth = ((this.state.wWidth * totalWidth) - 270) * (1 - nameLeftPadding);
        if (this.state.canEdit) {
            nameWidth = ((this.state.wWidth * totalWidth) - 330) * (1 - nameLeftPadding);
        }

        return (
            <div
                style={{
                    minWidth:  totalMinWidth + "px",
                    width: (totalWidth * 100) + "%",
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
                            marginLeft: (nameLeftPadding * 100) + "%"
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

export default PlayerLobbyData