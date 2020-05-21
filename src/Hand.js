import React from 'react';

import thing from './images/MJt1-.svg'

const heighToWidthRatio = 1.35;
const tileWidth = 60; // in pixels
const tileHeight = tileWidth * heighToWidthRatio; // in pixels

class Hand extends React.Component {
    constructor(props) {
        super(props);

        let handArray = [
            <img
                style={{
                    width: tileWidth + "px",
                    height: tileHeight + "px",
                }}
                src={thing}
            />
        ]
        for (let i = 0; i < 16; ++i) {
            handArray.push(
                <img
                    style={{
                        width: tileWidth + "px",
                        height: tileHeight + "px",
                        marginLeft: "-12px"
                    }}
                    src={thing}
                />
            )
        }

        this.state = {
            handArray: handArray,
        }
    }

    render() {
        return (
            <div>
                {this.state.handArray}
            </div>
        )
    }
}

export default Hand;