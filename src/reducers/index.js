import { CLICK_CELL } from '../actions'; 
import { getMoveValidity } from '../functions'
import { CONTENT } from '../constants'

const moveOnEmptyReducer = (state = [], action) => {
	switch (action.type) {
		case CLICK_CELL: 
			return state.map((item, ind) => {
				if (ind === action.id) {
					item.content = CONTENT.HORSE;
				}
				if (item.content === CONTENT.HORSE && ind !== action.id) {
					item.content = CONTENT.DISABLED;
				}
				return item;
			});

			default:	return state;		

		}
};

const reducer = (state = {}, action) => {
	switch (action.type) {  
		case CLICK_CELL: {
			   
			   let {horse, cells} = state.board;
			   let clickedContent = cells[action.id].content;
				 if (getMoveValidity(horse, action.id))	 {
					 	console.log('valid click');
					 	switch (clickedContent) {
					 	 case CONTENT.STAR: {
					 		console.log('click on star');				 	
					 		return state;
					 	}
					 	case CONTENT.LITTER: {
					 		console.log('click on litter');
					 		return state;
					 	}
					 	case CONTENT.EMPTY: {
					 		console.log('click on empty');	
					 		return Object.assign({}, state, {board: {cells: moveOnEmptyReducer(cells, action), horse: action.id}});
					 	}			
				    // return Object.assign({}, state, {board: state.board});
				   default: 
				   	console.log('not valid click');
				   	return state;
				   }
			 }
		}
		default: {
			return state;
		}
	}
}

export default reducer;
