import React from 'react';
import ReactDOM from 'react-dom';

import {KEY_CODES} from '../constants'
import './Modal.css';

export default class Modal extends React.Component {
  componentWillMount() {
    this.root = document.createElement('div');
    document.body.appendChild(this.root);
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.props.isModalOpen) {
      console.log(this.props);
      this.refs.first.focus();
    }
  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
  }

  onKeyDown = (evt) => {
    switch (evt.keyCode) {
      case KEY_CODES.TAB: {
        if ((evt.target === this.refs.first) && evt.shiftKey) {
          evt.preventDefault();
          this.refs.last.focus();
        }
        if ((evt.target === this.refs.last) && !evt.shiftKey) {
          evt.preventDefault();
          this.refs.first.focus();
        }
        break;
      }

      case KEY_CODES.ESC: {
        this.props.onModalCancel();
        break;
      }

      default:
      break;
    }
  }

  onLeaveButtons = (evt) => {
   if (evt.currentTarget.className === 'modal' && evt.target.className === 'modal' ) {
     this.refs.last.focus();
   }
 }

  render() {
      return (
      this.props.isModalOpen ?
      ReactDOM.createPortal(
        <div className="modal" onClick={this.onLeaveButtons}>
          <div className='modal__wrapper'>
             <h2 className='modal__title'>Для хода через закрашенную клетку:</h2>
             <button className="modal__button btn" onClick={this.props.onDisabledClick} onKeyDown={this.onKeyDown} ref='first'>Использовать жизнь</button>
             <button className="modal__button btn" onClick={this.props.onModalCancel} onKeyDown={this.onKeyDown}  ref='last'>Отмена</button>
          </div>
        </div>,
        this.root
      )
     :
     null);
  }
}
