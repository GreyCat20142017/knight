import { MAP_ID_COORDS, POSSIBILITY } from './constants'

const shuffleArray = function (entities) {
	const sortableEntities = entities.slice();
	for (let i = sortableEntities.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temporaryValue = sortableEntities[i];
		sortableEntities[i] = sortableEntities[j];
		sortableEntities[j] = temporaryValue;
	}
	return sortableEntities;
}; 

export const getInitialState = (sideLength, content) => {
	let arr = [];
	let indexArr = [];
	let objectLocation = {};

	for (let i = 0; i < sideLength; i++) {
		for (let j = 0; j < sideLength; j++) {			
			arr.push({id: j * sideLength + i, content: content.EMPTY});
			indexArr.push(j * sideLength + i);		
		}	
	};

	indexArr = shuffleArray(indexArr);

	if  (indexArr.length >= 3) {
		arr[indexArr[0]].content = content.HORSE;
		arr[indexArr[1]].content = content.STAR;
		arr[indexArr[2]].content = content.LITTER;	
	} 

	return {board: {cells: arr, horse: indexArr[0]}, info: {score: 0, life: 1}, recordsTable: []};
};


export const getMapIdCoords = (sideLength) => {
	let arr = [];
	for (let i = 0; i < sideLength; i++) {
		for (let j = 0; j < sideLength; j++) {			
		 arr[j * sideLength + i] = {x: i + 1, y: j + 1};
		}	
	};
	return arr;
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
	console.log(currentCoord.x +' '+ currentCoord.y+  ' -  ' + nextCoord.x +' '+ nextCoord.y+ ' '+isValid);
	return isValid;
}

