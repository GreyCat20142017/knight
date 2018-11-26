import { CLICK_CELL, START } from '../actions'; 
import { getMoveValidity, shuffleArray, getInitialState, getIndexById } from '../functions'
import { BOARD_SIDE, CONTENT } from '../constants'

const moveOnEmptyReducer = (state = [], action) => {
	switch (action.type) {
		case CLICK_CELL: 
			const emptyCells = shuffleArray(state.filter(item => ( item.content === CONTENT.EMPTY) && (item.id !== action.id)  ));			
			let tmpArray  = state.map((item, ind) => {
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
			return tmpArray;

		default:	return state;		
	}
};

const moveOnStarReducer = (state = [], action) => {
	switch (action.type) {
		case CLICK_CELL: 
			const emptyCells = shuffleArray(state.filter(item => ( item.content === CONTENT.EMPTY) && (item.id !== action.id) ));		
			let tmpArray = state.map((item, ind) => {
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
			return tmpArray;

		default:	return state;		
	}
};

const moveOnLitterReducer = (state = [], action) => {
	switch (action.type) {
		case CLICK_CELL: 
			const emptyCells = shuffleArray(state.filter(item => (item.content === CONTENT.EMPTY ) && (item.id !== action.id) ));			
			let tmpArray = state.map((item, ind) => {
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
			return tmpArray;

		default:	return state;		
	}
};

const reducer = (state = {}, action) => {
	switch (action.type) {  
		case CLICK_CELL: {

			let {horse, cells} = state.board;
			let {score, life} = state.info;
			let clickedContent = cells[action.id].content;
			if (getMoveValidity(horse, action.id))	 {				
				switch (clickedContent) {
					case CONTENT.STAR: {							 	
						return Object.assign({}, state, {board: {cells: moveOnStarReducer(cells, action), horse: action.id}, info: {score: score + 1, life: life}});
					}
					case CONTENT.LITTER: {						
						return Object.assign({}, state, {board: {cells: moveOnLitterReducer(cells, action), horse: action.id}});
					}	
					case CONTENT.DISABLED: {						
						return state;
					}
					case CONTENT.EMPTY: {						
						return Object.assign({}, state, {board: {cells: moveOnEmptyReducer(cells, action), horse: action.id}});
					}						
					default: 					
					return state;
				}
			}
			return state;
		}

		case START: return getInitialState(BOARD_SIDE, CONTENT);

		default: {
			return state;
		}
	}
}

export default reducer;
