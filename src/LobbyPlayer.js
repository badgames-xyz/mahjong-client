import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import StarsIcon from '@material-ui/icons/Stars';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';

import { getIcon, getAllIcons } from './Pictures'

const iconBorderColour = "#264653";
const iconBorderWidth = 2; // in px
const iconDiameter = 75; // in px

const hostIconWidth = 35; // in px
const hostIconPadding = 15; // in px

const nameFontSize = 25; // in px

const statusBarWidth = 160; // in px
const statusBarHeight = 60; // in px
const statusBarFontSize = 25; // in px

const notReadyColour = "#FFADAD"; // #E76F51
const readyColour = "#FDFFB6"; // #FDFFB6 E9C46A

class LobbyPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canEdit: this.props.canEdit,
            iconIndex: this.props.iconIndex,
            name: this.props.name,
            ready: this.props.ready,
            isHost: this.props.isHost,

            editingName: false,
            newName: this.props.name,

            changeIcon: false,

            wWidth: this.props.wWidth,
            wHeight: this.props.wHeight,
        }
    }

    onEditName() {
        this.setState({ editingName: true });
    }

    onAcceptName() {
        this.setState({
            editingName: false,
            name: this.state.newName,
        }, () => {
            this.props.onChangeName(this.state.name);
        });
    }

    onCancelName() {
        this.setState({ editingName: false });
    }

    onNameChange = (e) => {
        this.setState({
            newName: e.target.value
        });
    }

    renderName(namePadding, nameWidth) {
        let editButton = "";
        if (this.state.canEdit && !this.state.editingName) {
            editButton = <IconButton
                onClick={() => this.onEditName()}
            >
                <EditIcon fontSize="large"/>
            </IconButton>
        }

        let nameArea = <Typography
            style={{
                fontSize: nameFontSize + "px",
                overflow: "hidden"
            }}
            noWrap={true}
        >
            {this.state.name}
        </Typography>
        if (this.state.editingName) {
            nameArea = <TextField
                label="Change Name"
                defaultValue={this.state.name}
                onChange={this.onNameChange}
            />
        }

        let acceptButton = "";
        let cancelButton = "";
        if (this.state.editingName) {
            acceptButton = <IconButton
                onClick={() => this.onAcceptName()}
            >
                <CheckIcon fontSize="large"/>
            </IconButton>
            cancelButton = <IconButton
                onClick={() => this.onCancelName()}
            >
                <CloseIcon fontSize="large"/>
            </IconButton>
        }

        let hostIcon = "";
        if (this.state.isHost) {
            hostIcon = <StarsIcon fontSize="large"/>
        }

        return (
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
                        marginLeft: hostIconPadding + "px"
                    }}
                >
                    {hostIcon}
                </div>
                <div
                    style={{
                        float: "left",
                        maxWidth: nameWidth + "px",
                        marginLeft: namePadding + "px",
                        marginRight: namePadding + "px"
                    }}
                >
                    {nameArea}
                </div>
                <div
                    style={{
                        float: "left",
                    }}
                >
                    {editButton}
                </div>
                <div
                    style={{
                        float: "left",
                    }}
                >
                    {acceptButton}
                </div>
                <div
                    style={{
                        float: "left",
                    }}
                >
                    {cancelButton}
                </div>
            </div>
        )
    }

    selectIcon(index) {
        this.setState({
            changeIcon: false,
        }, () => {
            this.props.onChangeIcon(index);
        });
    }

    closeChangeIconDialog() {
        this.setState({ changeIcon: false });
    }

    changeIconDialog(open) {
        return (
            <Dialog onClose={() => this.closeChangeIconDialog()} open={open}>
                <DialogTitle>Choose Icon</DialogTitle>
                {getAllIcons().map((icon, index) => (
                    <IconButton
                        key={index}
                        style={{
                            width: "100px",
                            height: "100px",
                            margin: "0 auto",
                        }}
                        onClick={() => this.selectIcon(index)}
                    >
                        <img
                            style={{
                                width: iconDiameter + "px",
                                height: iconDiameter + "px",
                                borderRadius: "50%",
                                border: iconBorderWidth + "px solid " + iconBorderColour
                            }}
                            src={icon}
                            alt="Avatar Icon"
                        />
                    </IconButton>
                ))}
                <DialogActions>
                    <Button
                        autoFocus
                        color="primary"
                        onClick={() => this.closeChangeIconDialog()}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.ready !== this.props.ready) {
            this.setState({
                ready: this.props.ready
            })
        }
        if (prevProps.name !== this.props.name) {
            this.setState({
                name: this.props.name
            })
        }
        if (prevProps.ready !== this.props.ready) {
            this.setState({
                ready: this.props.ready
            })
        }
        if (prevProps.iconIndex !== this.props.iconIndex) {
            this.setState({
                iconIndex: this.props.iconIndex
            })
        }
        if (prevProps.isHost !== this.props.isHost) {
            this.setState({
                isHost: this.props.isHost
            })
        }
        if (prevProps.wWidth !== this.props.wWidth) {
            this.setState({
                wWidth: this.props.wWidth
            })
        }
        if (prevProps.wHeight !== this.props.wHeight) {
            this.setState({
                wHeight: this.props.wHeight
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

        let totalWidth = Math.min(800, this.state.wWidth * 0.52); // in px
        let minTotalWidth = 600; // in px

        const namePadding = 15; // in px
        let widthRemaining = iconDiameter + (2 * (iconBorderWidth + namePadding)) + statusBarWidth + 2;
        if (this.state.isHost) {
            widthRemaining = widthRemaining + (hostIconWidth + hostIconPadding);
        }
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
                {this.changeIconDialog(this.state.changeIcon)}
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
                        <CardActionArea
                            disableRipple
                            style={{
                                borderRadius: "50%",
                            }}
                        >
                            <img
                                style={{
                                    width: iconDiameter + "px",
                                    height: iconDiameter + "px",
                                    borderRadius: "50%",
                                    border: iconBorderWidth + "px solid " + iconBorderColour
                                }}
                                src={getIcon(this.state.iconIndex)}
                                alt="Avatar Icon"
                                onClick={() => {this.setState({ changeIcon: this.state.canEdit })}}
                            />
                        </CardActionArea>
                    </div>
                    {this.renderName(namePadding, nameWidth)}
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