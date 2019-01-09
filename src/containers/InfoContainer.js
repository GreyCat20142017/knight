import { connect } from 'react-redux';

import Info from '../components/Info';
import { onStart } from '../actions';

function mapStateToProps(state) {
  return {
    info: state.info
  };
}

function mapDispatchToProps(dispatch) {
  return {
   onStart:  () => dispatch(onStart())
 };
}

const InfoContainer = connect(mapStateToProps, mapDispatchToProps)(Info);

export default InfoContainer;
