import { CLICK_CELL, START, CLICK_DISABLED_CELL, CLOSE_MODAL, SHOW_MODAL } from '../actions';

import { getMoveValidity, shuffleArray, getInitialState, getAnalizeResult} from '../functions'
import { BOARD_SIDE, CONTENT, LIFE_COUNTER_BORDER } from '../constants'

const moveOnEmptyReducer = (state = {}, action) => {
	let {cells} = state.board;
	let {score, life} = state.info;
	switch (action.type) {
		case CLICK_CELL:
			const emptyCells = shuffleArray(cells.filter(item => ( item.content === CONTENT.EMPTY) && (item.id !== action.id)  ));
			let tmpArray  = cells.map((item, ind) => {
				if (ind === action.id) {
					item.content = CONTENT.HORSE;
				}
				if ((item.content === CONTENT.HORSE) && (ind !== action.id)) {
					item.content = CONTENT.DISABLED;
				}

				if (item.content === CONTENT.LITTER)  {
					item.content = CONTENT.DISABLED;
				}
				return item;
			});
			if (emptyCells.length > 0) {
					tmpArray[emptyCells[0].id].content = CONTENT.LITTER;
			}

			let result = getAnalizeResult(tmpArray, action.id);
			score = score + result.additionToScore;
			life = (result.additionToScore) && (score % LIFE_COUNTER_BORDER === 0) ? (life + 1) : life;
			return {board: {horse: action.id, cells: result.cells}, info: {score: score, life: life}};

		default:	return state;
	}
};

const moveOnStarReducer = (state = {}, action) => {
	let {cells} = state.board;
	let {score, life} = state.info;
	score++;
	switch (action.type) {
		case CLICK_CELL:
			const emptyCells = shuffleArray(cells.filter(item => ( item.content === CONTENT.EMPTY) && (item.id !== action.id) ));
			let tmpArray = cells.map((item, ind) => {
				if (ind === action.id) {
					item.content = CONTENT.HORSE;
				}
				if ((item.content === CONTENT.HORSE) && (ind !== action.id) ) {
					item.content = CONTENT.DISABLED;
				}
				if (item.content === CONTENT.LITTER)  {
					item.content = CONTENT.DISABLED;
				}
				return item;
			});

			if (emptyCells.length > 0) {
					tmpArray[emptyCells[0].id].content = CONTENT.STAR;
			}
			if (emptyCells.length > 1) {
					tmpArray[emptyCells[1].id].content = CONTENT.LITTER;
			}

			let result = getAnalizeResult(tmpArray, action.id);
			score = score + result.additionToScore;
			life = (result.additionToScore) && (score % LIFE_COUNTER_BORDER === 0) ? (life + 1) : life;
			return {board: {horse: action.id, cells: result.cells}, info: {score: score, life: life}};

		default:	return state;
	}
};

const moveOnLitterReducer = (state = {}, action) => {
	let {cells} = state.board;
	let {score, life} = state.info;
	switch (action.type) {
		case CLICK_CELL:

			const emptyCells = shuffleArray(cells.filter(item => (item.content === CONTENT.EMPTY ) && (item.id !== action.id) ));
			let tmpArray = cells.map((item, ind) => {
				if (ind === action.id) {
					item.content = CONTENT.HORSE;
				}
				if (item.content === CONTENT.HORSE && ind !== action.id) {
					item.content = CONTENT.DISABLED;
				}
				return item;
			});
			if (emptyCells.length > 0) {
					tmpArray[emptyCells[0].id].content = CONTENT.LITTER;
			}

			let result = getAnalizeResult(tmpArray, action.id);
			score = score + result.additionToScore;
			life = (result.additionToScore) && (score % LIFE_COUNTER_BORDER === 0) ? (life + 1) : life;
			return {board: {horse: action.id, cells: result.cells}, info: {score: score, life: life}};

		default:	return state;
	}
};

const moveWithLiveLossReducer  = (state = {}, action) => {
 let {cells, horse} = state.board;
 let {score, life} = state.info;
 let tmp = state.modal.tmpHorse || horse;

  switch (action.type) {
    case CLICK_DISABLED_CELL:
      const emptyCells = shuffleArray(cells.filter(item => ( item.content === CONTENT.EMPTY) && (item.id !== tmp)));
      let tmpArray  = cells.map((item, ind) => {

        if ((item.content === CONTENT.HORSE) && (ind !== tmp)) {
          item.content = CONTENT.DISABLED;
        }
        if ((item.content === CONTENT.LITTER)) {
          item.content = CONTENT.DISABLED;
        }
        if (ind === tmp) {
          item.content = CONTENT.HORSE;
        }
        return item;
      });
      if (emptyCells.length > 0) {
          tmpArray[emptyCells[0].id].content = CONTENT.LITTER;
      }
      let result = getAnalizeResult(tmpArray, action.id);
      score = score + result.additionToScore;
      life = (result.additionToScore) && (score % LIFE_COUNTER_BORDER === 0) ? (life + 1) : life;
      return {board: {horse: tmp, cells: result.cells}, info: {score: score, life: life - 1}, modal: {isModalOpen: false}};

    default:  return state;
  }
};

const reducer = (state = {}, action) => {
	let {horse, cells} = state.board;

	switch (action.type) {
		case CLICK_CELL: {

			let clickedContent = cells[action.id].content;
			if (getMoveValidity(horse, action.id))	 {
				switch (clickedContent) {
					case CONTENT.STAR: {
						return Object.assign({}, state,  moveOnStarReducer(state, action));
					}
					case CONTENT.LITTER: {
						return Object.assign({}, state, moveOnLitterReducer(state, action));
					}
					case CONTENT.DISABLED: {
						return state;
					}
					case CONTENT.EMPTY: {
						return Object.assign({}, state,  moveOnEmptyReducer(state, action));
					}
					default:
					return state;
				}
			}
      return state;
		};

		case START: return getInitialState(BOARD_SIDE, CONTENT);

    case CLOSE_MODAL: return Object.assign({}, state, { modal: {isModalOpen: false}});

    case SHOW_MODAL: return (state.info.life > 0 ) ? Object.assign({}, state, { modal: {isModalOpen: true, tmpHorse: action.id}}) : state;

    case CLICK_DISABLED_CELL: return (state.info.life > 0 ) ?  Object.assign({}, state, moveWithLiveLossReducer(state, action)) : state;

		default:
			return state;

	}
}

export default reducer;
