import { getMapIdCoords } from './functions.js';

export const BOARD_SIDE = 8;

export const CONTENT = {
  EMPTY: {clickable: true, svg: 'none', title: 'свободно'}, 
  DISABLED: {clickable: false, svg: 'none', title: 'занято'}, 
  HORSE: {clickable: false, svg: 'horse', title: 'конь'},
  LITTER: {clickable: true, svg: 'litter', title: 'клетка будет заблокирована в начале следующего хода'},
  STAR: {clickable: true, svg: 'star', title: '+ 1 очко'}
};

// export const HSL = {horse: CONTENT.HORSE, star: CONTENT.STAR: litter: CONTENT.LITTER};

export const POSSIBILITY = [{x: -1, y: -2}, {x: -2, y: -1}, {x: -2, y: 1}, {x: 1, y: -2}, {x: -1, y: 2}, {x: 2, y: -1}, {x: 1, y: 2}, {x: 2, y: 1}];

// export const MAP_ID_COORDS = getMapIdCoords(BOARD_SIDE);

let arr = [];
	for (let i = 0; i < BOARD_SIDE; i++) {
		for (let j = 0; j < BOARD_SIDE; j++) {			
		 arr[j * BOARD_SIDE + i] = {x: i + 1, y: j + 1};
		}	
};



export const MAP_ID_COORDS = arr;