const getMapIdCoords = (sideLength) => {
	let arr = [];
	for (let i = 0; i < sideLength; i++) {
		for (let j = 0; j < sideLength; j++) {			
		 arr[j * sideLength + i] = {x: i + 1, y: j + 1};
		}	
	};
	return arr;
};

export const BOARD_SIDE = 8;

export const CONTENT = {
  EMPTY: {clickable: true, svg: 'none', title: 'свободно'}, 
  DISABLED: {clickable: false, svg: 'none', title: 'занято'}, 
  HORSE: {clickable: false, svg: 'horse', title: 'конь'},
  LITTER: {clickable: true, svg: 'litter', title: 'клетка будет заблокирована в начале следующего хода'},
  STAR: {clickable: true, svg: 'star', title: '+ 1 очко'}
};

export const POSSIBILITY = [{x: -1, y: -2}, {x: -2, y: -1}, {x: -2, y: 1}, {x: 1, y: -2}, {x: -1, y: 2}, {x: 2, y: -1}, {x: 1, y: 2}, {x: 2, y: 1}];

const arr = getMapIdCoords(BOARD_SIDE);

export const MAP_ID_COORDS = arr;