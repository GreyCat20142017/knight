import { connect } from 'react-redux';

import Board from '../components/Board';

function mapStateToProps(state) {
    return {
        cells: state
    };
}

const BoardContainer = connect(mapStateToProps)(Board);

export default BoardContainer;