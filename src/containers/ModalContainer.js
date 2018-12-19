import { connect } from 'react-redux';

import Modal from '../components/Modal';
import { onDisabledClick, onModalCancel } from '../actions';

const mapStateToProps = (state) => {
  return {
    isModalOpen: state.modal.isModalOpen
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDisabledClick:  id => dispatch(onDisabledClick(id)),
    onModalCancel:  () => dispatch(onModalCancel())
  };
}

const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(Modal);

export default ModalContainer;
