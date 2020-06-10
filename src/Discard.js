import React from 'react';
import { Typography } from '@material-ui/core';
import { getCard, getHidden } from './Pictures'

let maxTilesPerRow = 18
let widthHeightRatio = 1.35
let lastDiscardRatio = 4
let bannerHeight = 50
let scrollBarOffset = 15

class Discard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            discard: this.props.discard,
            drawpile: this.props.drawpile,
            wWidth: this.props.wWidth - scrollBarOffset,
            wHeight: this.props.wHeight
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.wWidth !== this.props.wWidth) {
            this.setState({ wWidth: this.props.wWidth - scrollBarOffset })
        }
        if (prevProps.wHeight !== this.props.wHeight) {
            this.setState({ wHeight: this.props.wHeight })
        }
        if (prevProps.discard !== this.props.discard) {
            this.setState({ discard: this.props.discard })
        }
        if (prevProps.drawpile !== this.props.drawpile) {
            this.setState({ drawpile: this.props.drawpile })
        }
    }

    renderTile(width, height, index){
        return(
            <img
                style={{width: width-5 + "px", height: height-(5*widthHeightRatio) + "px", display: "inline-block", verticalAlign: "middle", paddingTop: "5px", paddingLeft: "5px"}}
                src={getCard(this.state.discard[index].suit, this.state.discard[index].num)}
                alt={"Loading"}
                key={index}
            />
        )
    }

    renderTileRow(startIndex, tilesPerRow){
        console.log(this.state.wWidth)
        let row = []
        for (let i = startIndex; i < Math.min(startIndex + tilesPerRow, this.state.discard.length); i++){
            row.push(this.renderTile((this.state.wWidth - this.state.wWidth/lastDiscardRatio)/maxTilesPerRow,
                ((this.state.wWidth - this.state.wWidth/lastDiscardRatio)/maxTilesPerRow)*widthHeightRatio, i))
        }
        return(
            <div>
                {row}
            </div>
        )
    }

    render(){
        let rows = []
        for (let i = 1; i < Math.ceil(this.state.discard.length/maxTilesPerRow); i++){
            rows.push(<div key={i}>{this.renderTileRow(i * maxTilesPerRow, maxTilesPerRow)}</div>)
        }
        let lastDiscard = "";
        if (this.state.discard.length > 0) {
            lastDiscard = <div style={{display: "inline-block"}}>
                {this.renderTile((this.state.wWidth - bannerHeight)/lastDiscardRatio, this.state.wWidth/lastDiscardRatio * widthHeightRatio, 0)}
                <Typography
                    style={{color: "white", paddingLeft: "5px", fontSize: "100%", textAlign: "center"}}
                >
                    Last Discarded
                </Typography>
            </div>
        }
        return(
            <div>
                <div style={{textAlign: "center", height: bannerHeight + "px"}}>
                    <img
                        style={{width: bannerHeight/widthHeightRatio + "px", height: bannerHeight + "px", display: "inline-block", verticalAlign: "middle"}}
                        src={getHidden("back")}
                        alt={"Loading"}
                    />
                    <Typography
                        style={{paddingLeft: "5px", color: "white", fontSize: "xx-large", verticalAlign: "middle", display: "inline-block"}}
                    >
                        {this.props.drawpile + " cards remaining"}
                    </Typography>
                </div>
                {lastDiscard}
                <div style={{display: "inline-block", verticalAlign: "top"}}>
                    {rows}
                </div>
        </div>
        )
    }

}

export default Discard