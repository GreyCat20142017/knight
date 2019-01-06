import { CLICK_CELL, START, CLICK_DISABLED_CELL, CLOSE_MODAL, SHOW_MODAL } from '../actions';

import { getMoveValidity, shuffleArray, getInitialState, getAnalizeResult} from '../functions'
import { BOARD_SIDE, CONTENT, LIFE_COUNTER_BORDER } from '../constants'

const onEmptyStarCellMap = (cells, actionId) => {
 return cells.map((item, ind) => {
  if (ind === actionId) {
    item.content = CONTENT.HORSE;
  }
  if ((item.content === CONTENT.HORSE) && (ind !== actionId)) {
    item.content = CONTENT.DISABLED;
  }

  if (item.content === CONTENT.LITTER)  {
    item.content = CONTENT.DISABLED;
  }
  return item;
});
};

const onLitterCellMap = (cells, actionId) => {
 return cells.map((item, ind) => {
  if (ind === actionId) {
    item.content = CONTENT.HORSE;
  }
  if (item.content === CONTENT.HORSE && ind !== actionId) {
    item.content = CONTENT.DISABLED;
  }
  return item;
});
};

const onLifeLossCellMap = (cells, actionId) => {
 return cells.map((item, ind) => {
  if (ind === actionId) {
    item.content = CONTENT.HORSE;
  }
  if (item.content === CONTENT.HORSE && ind !== actionId) {
    item.content = CONTENT.DISABLED;
  }
  return item;
});
};

const commonMoveReducer = (state = {}, action, specific) => {
  let {cells, horse} = state.board;
  let {score, life} = state.info;
  let actionId = (specific.content === CONTENT.DISABLED) ? (state.modal.tmpHorse || horse) : action.id;

  score = (specific.content === CONTENT.STAR) ? score + 1 : score;

  switch (action.type) {
    case CLICK_CELL:
    case CLICK_DISABLED_CELL:
      const emptyCells = shuffleArray(cells.filter(item => ( item.content === CONTENT.EMPTY) && (item.id !== actionId)  ));
      let tmpArray  = specific.cellsMap(cells, actionId);
      if (emptyCells.length > 0) {
          tmpArray[emptyCells[0].id].content = CONTENT.LITTER;
      }
      if (emptyCells.length > 1 && specific.content === CONTENT.STAR) {
          tmpArray[emptyCells[1].id].content = CONTENT.STAR;
      }
      let result = getAnalizeResult(tmpArray, actionId);
      score = score + result.additionToScore;
      life = (result.additionToScore) && (score % LIFE_COUNTER_BORDER === 0) ? (life + 1) : life;
      return {board: {horse: actionId, cells: result.cells}, info: {score: score, life: life - specific.loss}, modal: {isModalOpen: false}};
    default:  return state;
  }
};

const reducer = (state = {}, action) => {
	let {horse, cells} = state.board;

	switch (action.type) {
		case CLICK_CELL: {

			let clickedContent = cells[action.id].content;
			if (getMoveValidity(horse, action.id)) {
				switch (clickedContent) {
					case CONTENT.STAR: {
						return Object.assign({}, state, commonMoveReducer(state, action, {cellsMap: onEmptyStarCellMap, content: clickedContent, loss: 0}));
					}
					case CONTENT.LITTER: {
						return Object.assign({}, state,  commonMoveReducer(state, action, {cellsMap: onLitterCellMap, content: clickedContent, loss: 0}));
					}
					case CONTENT.DISABLED: {
						return state;
					}
					case CONTENT.EMPTY: {
						return Object.assign({}, state,  commonMoveReducer(state, action, {cellsMap: onEmptyStarCellMap, content: clickedContent, loss: 0}));
					}
					default: {
            return state;
          }
				}
		  }
      return state;
		};

		case START: return getInitialState(BOARD_SIDE, CONTENT);

    case CLOSE_MODAL: return Object.assign({}, state, { modal: {isModalOpen: false}});

    case SHOW_MODAL: return (state.info.life > 0 ) ? Object.assign({}, state, { modal: {isModalOpen: true, tmpHorse: action.id}}) : state;

    case CLICK_DISABLED_CELL: return (state.info.life > 0 ) ?
      Object.assign({}, state,  commonMoveReducer(state, action, {cellsMap: onLifeLossCellMap, content: CONTENT.DISABLED, loss: 1})) :
      state;

		default:
			return state;
	}
}

export default reducer;
