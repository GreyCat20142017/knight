import {
  MAP_ID_COORDS,
  POSSIBILITY,
  BOARD_SIDE,
  MIN_RECTANGLE_LIMIT,
  CONTENT,
  RECORDS_TABLE_LIMIT,
  LIFE_COUNTER_BORDER,
  MODAL_TYPES } from './constants'

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

const getRecordsTable = () => {
  let records = [];
  let randomNames = shuffleArray(['Пупкин', 'Ляпкин', 'Тяпкин', 'Иванов', 'Петров', 'Сидоров']);
  for (let i = 1; i <= RECORDS_TABLE_LIMIT; i++) {
    records.push({
      name: randomNames[i],
      result: getRandomFromRange (1,  LIFE_COUNTER_BORDER)});
  }
  return records.sort((a, b) => b.result - a.result);
}

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

  return {
    board: {cells: arr, horse: indexArr[0]},
    info: {score: 0, life: 1, gameOver: false},
    modal: {isModalOpen: false, modalType: MODAL_TYPES.nothing},
    records: getRecordsTable(),
    undoState: null
  };
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

const getIndexByCoord = (coord, sideLength) => ((coord.x - 1) * (sideLength) + (coord.y - 1));

export const getMovePossibility = (idCurrent, cells) => {
  let currentCoord = getCoordXYByID(idCurrent, BOARD_SIDE);
  let isMovePossible =  POSSIBILITY.some(item => {
    let itemCoord = {x: currentCoord.x + item.x, y: currentCoord.y + item.y};
    return (
      (itemCoord.x >= 1) &&  (itemCoord.x <= BOARD_SIDE) &&
      (itemCoord.y >= 1) && (itemCoord.y <= BOARD_SIDE)  &&
      (cells[getIndexByCoord(itemCoord, BOARD_SIDE)].content !== CONTENT.DISABLED)
      )
  });
  return isMovePossible;
};

export const getCoordByID = (id, sideLength) => {
  return {i: Math.floor(id / sideLength), j: id % sideLength};
};

export const getCoordXYByID = (id, sideLength) => {
  return {x: Math.floor(id / sideLength) + 1, y: id % sideLength + 1};
};

const getSubmatrix = (size) => {
  let sub = new Array(size);
  for (let i = 0; i < size; i++) {
    sub[i] = new Array(size);
    for (let j = 0; j < size; j++) {
      sub[i][j] = 1;
    }
  };
  return sub;
}

const getSquaresWithHorse  = (arr, minLimit, horse) => {
  let squares = [];
  let sub = getSubmatrix(minLimit);

  for (let i = 0; i < arr.length - sub.length + 1; i++) {
    for (let j = 0; j < arr[0].length - sub[0].length + 1; j++) {
      let submatrix = true;
      for (let k = 0; k < sub.length; ++k) {
        for (let l = 0; l < sub[0].length; ++l) {
          if (arr[i + k][j + l] === sub[k][l]) {
          } else {
            submatrix = false;
          }
        }
      }
      if (submatrix && ((horse.i >= i && horse.i < i + minLimit) && (horse.j >= j && horse.j < j + minLimit))) {
        squares.push( {coords: {i:i, j: j}, size: {width: minLimit, height: minLimit}});
      }
    }
  }
  return squares;
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
 let maxRectangle = getSquaresWithHorse(arr, MIN_RECTANGLE_LIMIT, horseCoords);
 let resetItems = [];
 if (maxRectangle.length > 0) {
      maxRectangle.forEach(rectangle => {
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
    });
    needIncreaseScore = true;
 }
 return {cells: newState, additionToScore: (needIncreaseScore ? 1 : 0)};
};
