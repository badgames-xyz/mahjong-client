import React from 'react';
import { Typography } from '@material-ui/core';
import { getCard, getHidden } from './Pictures'

let maxTilesPerRow = 15
let widthHeightRatio = 1.35
let cardsRemainingRatio = 13
let lastDiscardRatio = 4

class Discard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            discard: this.props.discard,
            drawpile: this.props.drawpile
        }
    }

    renderTile(width, height, index){
        return(
            <img
                style={{width: width, height: height, display: "inline-block", verticalAlign: "middle", paddingLeft: "5px"}}
                src={getCard(this.state.discard[index].suit, this.state.discard[index].num)}
                alt={"Loading"}
                key={index}
            />
        )
    }

    renderTileRow(startIndex, tilesPerRow){
        let row = []
        for (let i = startIndex; i < startIndex + tilesPerRow; i++){
            row.push(this.renderTile((this.props.wWidth - this.props.wWidth/lastDiscardRatio - 5*(maxTilesPerRow + 2))/maxTilesPerRow + "px", + 
                ((this.props.wWidth - this.props.wWidth/lastDiscardRatio - 5*(maxTilesPerRow + 2))/maxTilesPerRow)*widthHeightRatio + "px", i))
        }
        return(
            <div>
                {row}
            </div>
        )
    }

    render(){
        let rows = []
        for (let i = 0; i < Math.ceil(this.state.discard.length/maxTilesPerRow); i++){
            rows.push(<div style={{paddingBottom: "5px"}} key={i}>{this.renderTileRow(i * maxTilesPerRow, maxTilesPerRow)}</div>)
        }
        return(
            <React.Fragment>
                <div style={{textAlign: "center"}}>
                    <img
                        style={{width: this.props.wHeight/cardsRemainingRatio/widthHeightRatio + "px", height: this.props.wHeight/cardsRemainingRatio + "px", display: "inline-block", verticalAlign: "middle"}}
                        src={getHidden("back")}
                        alt={"Loading"}
                    />
                    <Typography
                        style={{paddingLeft: "5px", color: "white", fontSize: this.props.wHeight/cardsRemainingRatio + "px", verticalAlign: "middle", display: "inline-block"}}
                    >
                        {this.props.drawpile + " cards remaining"}
                    </Typography>
                </div>
                <div style={{display: "inline-block"}}>
                    {this.renderTile(this.props.wWidth/lastDiscardRatio + "px", this.props.wWidth/lastDiscardRatio * widthHeightRatio + "px", 0)}
                    <Typography
                        style={{color: "white", paddingLeft: "5px", fontSize: "100%", textAlign: "center"}}
                    >
                        Last Discarded
                    </Typography>
                </div>
                <div style={{display: "inline-block", verticalAlign: "top"}}>
                    {rows}
                </div>
        </React.Fragment>
        )
    }

}

export default Discard