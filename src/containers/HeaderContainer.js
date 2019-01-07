import { connect } from 'react-redux';

import Header from '../components/Header';
import { onUndo, onAboutShow } from '../actions';

const mapStateToProps = (state) => {
  return {
    undoState: state.undoState,
    modal: state.modal,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
   onUndo:  id => dispatch(onUndo(id)),
   onAboutShow:  id => dispatch(onAboutShow(id))
 }
};

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;
