import { MAP_ID_COORDS, POSSIBILITY } from './constants'

export const shuffleArray = function (entities) {
	const sortableEntities = entities.slice();
	for (let i = sortableEntities.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temporaryValue = sortableEntities[i];
		sortableEntities[i] = sortableEntities[j];
		sortableEntities[j] = temporaryValue;
	}
	return sortableEntities;
}; 

const getRandomFromRange =  (min, max) => {
	return Math.floor(min + Math.random() * (max + 1 - min));
};

export const getRandomFromArray =  (arr) => {
	return arr[getRandomFromRange(1, arr.length) - 1];
};

export const getInitialState = (sideLength, content) => {
	let arr = [];
	let indexArr = [];
	for (let i = 0; i < sideLength * sideLength; i++) {	
			arr.push({id: i, content: content.EMPTY});
			indexArr.push(i);			
	};

	indexArr = shuffleArray(indexArr);

	if (indexArr.length >= 3) {
		arr[indexArr[0]].content = content.HORSE;
		arr[indexArr[1]].content = content.STAR;
		arr[indexArr[2]].content = content.LITTER;	
	} 

	return {board: {cells: arr, horse: indexArr[0]}, info: {score: 0, life: 1}};
};

export const getMoveValidity = (idCurrent, idNext) => {
	let isValid = false;
	let currentCoord = MAP_ID_COORDS[idCurrent];
	let nextCoord = MAP_ID_COORDS[idNext];
	POSSIBILITY.forEach(item => {
		if ((currentCoord.x + item.x === nextCoord.x) && (currentCoord.y + item.y === nextCoord.y)) {
			isValid = true;
		}
	});	
	return isValid;
};

const getSquares = (arr, minLimit) => {
	let squares = [];
	let iDimension = arr.length;
	let jDimension = arr[0].length;
	for (let i = 0; i < iDimension; i++) {
		for (let j = 0; j < jDimension; j++) {
			if (arr[i][j] === 1) {
				let tmpBegin = { i: i, j: j };
				let tmpSize = { width: 1, height: 1 };
				for (let jj = j + 1; jj < jDimension; jj++) {
					if (arr[i][jj] === 1) {
						tmpSize.width = tmpSize.width + 1;
					} else {
						break;
					}
				};

				for (let ii = i + 1; ii < iDimension; ii++) {
					if (arr[ii][j] === 0) {
						if (tmpSize.width >= minLimit && tmpSize.height >= minLimit) {
							squares.push({ coords: tmpBegin, size: tmpSize });
						};
						break;
					} else {
						tmpSize.height = tmpSize.height + 1;
						for (let jjj = j; jjj < (j + tmpSize.width - 1); jjj++) {
							if (arr[ii][jjj] === 0) {
								tmpSize.width = jjj;
							}
						}
					}
				}
				if (tmpSize.width >= minLimit && tmpSize.height >= minLimit) {
					squares.push({ coords: tmpBegin, size: tmpSize });
				}
			}
		}
	}
	return squares;
};

const getMaxSquareWithHorse = (arr, minLimit, horseCoords) => {
   return getSquares(arr, minLimit).filter(item => (
        ((horseCoords.i >= item.coords.i) && (horseCoords.i < (item.coords.i + item.size.height - 1))) &&
         (horseCoords.j >= item.coords.j) && (horseCoords.j < (item.coords.j + item.size.width - 1))
    )).reduce((first, second) => (first.size.height * first.size.width > second.size.height * second.size.width ? first : second));
};

const transformStateToArray = (state) => {

};