import { MAP_ID_COORDS, POSSIBILITY, BOARD_SIDE, MIN_RECTANGLE_LIMIT, CONTENT } from './constants'

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

	return {board: {cells: arr, horse: indexArr[0]}, info: {score: 0, life: 1}, modal: {isModalOpen: false}};
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
				let tmpBegin = {i: i, j: j};
				let tmpSize = {width: 1, height: 1};
				for (let jj = j + 1; jj < jDimension; jj++) {
					if (arr[tmpBegin.i][jj] === 1) {
						tmpSize.width = tmpSize.width + 1;
					} else {
						break;
					}
				};

				for (let ii = tmpBegin.i + 1; ii < iDimension; ii++) {
					if (arr[ii][tmpBegin.j] === 0) {
						if (tmpSize.width >= minLimit && tmpSize.height >= minLimit) {
							squares.push({coords: Object.assign({}, tmpBegin), size: Object.assign({}, tmpSize)});
						};
						break;
					} else {
						tmpSize.height = tmpSize.height + 1;
						for (let jjj = tmpBegin.j + 1; jjj <= (j + tmpSize.width - 1); jjj++) {
							if (arr[ii][jjj] === 0) {
								tmpSize.height = tmpSize.height - 1;
								if (tmpSize.width >= minLimit && tmpSize.height >= minLimit) {
									squares.push({coords: Object.assign({}, tmpBegin), size: Object.assign({}, tmpSize)});
								};
								tmpSize.width = jjj - tmpBegin.j;
								if (tmpSize.width >= minLimit && tmpSize.height >= minLimit) {
									squares.push({coords: Object.assign({}, tmpBegin), size: Object.assign({}, tmpSize)});
								};
							}
						}
					}
				};

				if (tmpSize.width >= minLimit && tmpSize.height >= minLimit) {
					squares.push({coords: Object.assign({}, tmpBegin), size: Object.assign({}, tmpSize)});
				}
			}
		}
	}

	return squares;
};

const getMaxSquareWithHorse = (arr, minLimit, horseCoords) => {

	let squaresArr =  getSquares(arr, minLimit).filter(item => (
		((horseCoords.i >= item.coords.i) && (horseCoords.i <= (item.coords.i + item.size.height - 1))) &&
		(horseCoords.j >= item.coords.j) && (horseCoords.j <= (item.coords.j + item.size.width - 1))
		));
	switch (squaresArr.length) {
		case 0:
			return null;
		case 1:
			return	squaresArr[0];
		default:
			return 	squaresArr.reduce((first, second) => (first.size.height * first.size.width >= second.size.height * second.size.width ? first : second));
	}
};

export const getCoordByID = (id, sideLength) => {
	return {i: Math.floor(id / sideLength), j: id % sideLength};
};

export const getAnalizeResult = (stateArr, horse) => {
	let newState = [...stateArr];
	let needIncreaseScore = false;
	let horseCoords = getCoordByID(horse, BOARD_SIDE);
	let tmpArr = stateArr.map(item => (item.content === CONTENT.DISABLED || item.content === CONTENT.HORSE) ? 1 : 0);
	let arr = new Array(BOARD_SIDE);
	for (let i = 0; i < BOARD_SIDE; i++) {
		arr[i] = new Array(BOARD_SIDE);
		for (let j = 0; j < BOARD_SIDE; j++) {
			arr[i][j] = tmpArr[i * BOARD_SIDE + j];
		}
	};
 let maxRectangle = getMaxSquareWithHorse(arr, MIN_RECTANGLE_LIMIT, horseCoords);
 let resetItems = [];
 if (maxRectangle) {
 		let rectangle = maxRectangle;
 			for (let i = 0; i < rectangle.size.height; i++) {
 				for (let j = 0; j < rectangle.size.width; j++) {
 				resetItems.push(rectangle.coords.i * BOARD_SIDE + i * BOARD_SIDE + rectangle.coords.j + j);
 			}
 		};
 		for (let k = 0; k < resetItems.length; k++) {
 			if (newState[resetItems[k]].content !== CONTENT.HORSE) {
 				newState[resetItems[k]].content = CONTENT.EMPTY;
 			}
 		};
 		needIncreaseScore = true;
 }
 return {cells: newState, additionToScore: (needIncreaseScore ? 1 : 0)};
};
