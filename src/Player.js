import React from 'react';
import Typography from '@material-ui/core/Typography';

import { getIcon, getCard } from './Pictures'

class Player extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            position: this.props.position, // center, left, right, top
            name: "Test Name", // should come from props
            iconIndex: 1, // should come from props
            direction: "east", // should come from props
            // hand, name, iconIndex, completed, direction, handSize
        }
    }

    createDirection() {
        const height = 25; // px
        const width = height * 0.75; // px
        const borderWidth = 2;
        const borderColour = "#264653";
        return <img
            style={{
                width: width + "px",
                height: height + "px",
                border: borderWidth + "px solid " + borderColour
            }}
            src={getCard(this.state.direction)}
            alt={this.state.direction}
        />
    }

    createIcon() {
        const iconDiameter = 25; // px
        const iconBorderWidth = 2;
        const iconBorderColour = "#264653";
        return <img
            style={{
                width: iconDiameter + "px",
                height: iconDiameter + "px",
                borderRadius: "50%",
                border: iconBorderWidth + "px solid " + iconBorderColour
            }}
            src={getIcon(this.state.iconIndex)}
            alt="Avatar Icon"
        />
    }

    createName() {
        const fontSize = 20;
        return <Typography
            style={{
                fontSize: fontSize + "px",
                overflow: "hidden"
            }}
            noWrap={true}
        >
            {this.state.name}
        </Typography>
    }

    createNameTag() {
        return (
            <div
                style={{
                    display: "block",
                    margin: "0 auto"
                }}
            >
                <div
                    style={{
                        float: "left",
                    }}
                >
                    {this.createDirection()}
                </div>
                <div
                    style={{
                        float: "left",
                        marginLeft: "5px",
                    }}
                >
                    {this.createIcon()}
                </div>
                <div
                    style={{
                        float: "left",
                        marginLeft: "5px",
                    }}
                >
                    {this.createName()}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div
                style={{
                    margin: "auto"
                }}
            >
                {this.createNameTag()}
            </div>
        )
    }
}

export default Player