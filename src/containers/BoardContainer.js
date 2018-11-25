import { connect } from 'react-redux';

import Board from '../components/Board';
import { onCellClick } from '../actions'; 

function mapStateToProps(state) {
    return {
        board: state.board
    };
}

function mapDispatchToProps(dispatch) {
    return {
       onCellClick:  id => dispatch(onCellClick(id))
    };
}

//connect создает функцию создания контейнера. Параметром при вызове этой ф-ции служит презентационный компонент.
const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

export default BoardContainer;