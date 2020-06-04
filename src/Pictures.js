import yuta from './images/icons/ghettoyuta.png'
import poggers from './images/icons/poggers.png'
import rila from './images/icons/rila.png'
import yessir from './images/icons/yessir.png'

import char1 from './images/pieces/char1.png'
import char2 from './images/pieces/char2.png'
import char3 from './images/pieces/char3.png'
import char4 from './images/pieces/char4.png'
import char5 from './images/pieces/char5.png'
import char6 from './images/pieces/char6.png'
import char7 from './images/pieces/char7.png'
import char8 from './images/pieces/char8.png'
import char9 from './images/pieces/char9.png'

import circle1 from './images/pieces/circle1.png'
import circle2 from './images/pieces/circle2.png'
import circle3 from './images/pieces/circle3.png'
import circle4 from './images/pieces/circle4.png'
import circle5 from './images/pieces/circle5.png'
import circle6 from './images/pieces/circle6.png'
import circle7 from './images/pieces/circle7.png'
import circle8 from './images/pieces/circle8.png'
import circle9 from './images/pieces/circle9.png'

import stick1 from './images/pieces/stick1.png'
import stick2 from './images/pieces/stick2.png'
import stick3 from './images/pieces/stick3.png'
import stick4 from './images/pieces/stick4.png'
import stick5 from './images/pieces/stick5.png'
import stick6 from './images/pieces/stick6.png'
import stick7 from './images/pieces/stick7.png'
import stick8 from './images/pieces/stick8.png'
import stick9 from './images/pieces/stick9.png'

import specialgreen from './images/pieces/specialgreen.png'
import specialred from './images/pieces/specialred.png'
import specialwhite from './images/pieces/specialwhite.png'

import directioneast from './images/pieces/directioneast.png'
import directionwest from './images/pieces/directionwest.png'
import directionnorth from './images/pieces/directionnorth.png'
import directionsouth from './images/pieces/directionsouth.png'

import hiddenback from './images/pieces/hiddenback.png'
import hiddentop from './images/pieces/hiddentop.png'
import hiddenleft from './images/pieces/hiddenleft.png'
import hiddenright from './images/pieces/hiddenright.png'

const icons = [
    yuta,
    poggers,
    rila,
    yessir,
]

export function getIcon(index) {
    return icons[index];
}

export function getAllIcons() {
    return icons;
}

export function getCard(suit, num) {
    if (suit === "char") {
        switch (num) {
            case 1:
                return char1;
            case 2:
                return char2;
            case 3:
                return char3;
            case 4:
                return char4;
            case 5:
                return char5;
            case 6:
                return char6;
            case 7:
                return char7;
            case 8:
                return char8;
            case 9:
                return char9;
            default:
                break;
        }
    } else if (suit === "circle") {
        switch (num) {
            case 1:
                return circle1;
            case 2:
                return circle2;
            case 3:
                return circle3;
            case 4:
                return circle4;
            case 5:
                return circle5;
            case 6:
                return circle6;
            case 7:
                return circle7;
            case 8:
                return circle8;
            case 9:
                return circle9;
            default:
                break;
        }
    } else if (suit === "stick") {
        switch (num) {
            case 1:
                return stick1;
            case 2:
                return stick2;
            case 3:
                return stick3;
            case 4:
                return stick4;
            case 5:
                return stick5;
            case 6:
                return stick6;
            case 7:
                return stick7;
            case 8:
                return stick8;
            case 9:
                return stick9;
            default:
                break;
        }
    } else if (suit === "special") {
        switch (num) {
            case 1:
                return directioneast;
            case 2:
                return directionsouth;
            case 3:
                return directionwest;
            case 4:
                return directionnorth;
            case 5:
                return specialred;
            case 6:
                return specialgreen;
            case 7:
                return specialwhite;
            default:
                break;
        }
    }
}

export function getHidden(direction) {
    switch (direction) {
        case "back":
            return hiddenback;
        case "top":
            return hiddentop;
        case "left":
            return hiddenleft;
        case "right":
            return hiddenright;
        default:
            break;
    }
}
