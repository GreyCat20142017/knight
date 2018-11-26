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

	if  (indexArr.length >= 3) {
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
}