import { connect } from 'react-redux';

import Info from '../components/Info';
import { onCellClick, onStart } from '../actions'; 

function mapStateToProps(state) {
    return {
        info: state.info
    };
}

function mapDispatchToProps(dispatch) {
    return {
       onCellClick:  id => dispatch(onCellClick(id)),
       onStart:  () => dispatch(onStart())
    };
}

const InfoContainer = connect(mapStateToProps, mapDispatchToProps)(Info);

export default InfoContainer;
