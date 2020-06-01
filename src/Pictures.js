import yuta from './images/icons/ghettoyuta.png'
import poggers from './images/icons/poggers.png'
import rila from './images/icons/rila.png'
import yessir from './images/icons/yessir.png'

import east from './images/pieces/directioneast.png'
import west from './images/pieces/directionwest.png'
import north from './images/pieces/directionnorth.png'
import south from './images/pieces/directionsouth.png'

const icons = [
    yuta,
    poggers,
    rila,
    yessir,
]

export function getIcon(index) {
    return icons[index];
}

const cards = {
    "east": east,
    "west": west,
    "north": north,
    "south": south,
}

export function getCard(name) {
    return cards[name];
}
