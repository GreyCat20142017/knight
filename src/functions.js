
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

export const getInitialState = (arrLength, content) => {
	let arr = [];
	let indexArr = [];
	for (let i = 0; i < arrLength; i++) {
		arr.push(content.EMPTY);
		indexArr.push(i);
	};

	indexArr = shuffleArray(indexArr);
	if  (indexArr.length >= 3) {
		arr[indexArr[0]] = content.HORSE;
		arr[indexArr[1]] = content.STAR;
		arr[indexArr[2]] = content.LITTER;
	} 

	return arr;
}
