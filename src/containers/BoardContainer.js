import { connect } from 'react-redux';

import Board from '../components/Board';
import { onCellClick, onModalShow } from '../actions';

function mapStateToProps(state) {
    return {
        board: state.board,
        modal: state.modal
    };
}

function mapDispatchToProps(dispatch) {
    return {
       onCellClick:  id => dispatch(onCellClick(id)),
       onModalShow:  id => dispatch(onModalShow(id))
    };
}

//connect создает функцию создания контейнера. Параметром при вызове этой ф-ции служит презентационный компонент.
const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

export default BoardContainer;
