import React from 'react';
import ReactDOM from 'react-dom';

import {KEY_CODES, MODAL_TYPES} from '../constants'
import './Modal.css';

export default class Modal extends React.Component {

  componentWillMount() {
    this.root = document.createElement('div');
    this.singleButton = (this.props.modal.modalType === MODAL_TYPES.about);
    document.body.appendChild(this.root);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isModalOpen) {
      this.refs.first.focus();
    }
  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
  }

  onKeyDown = (evt) => {
    switch (evt.keyCode) {
      case KEY_CODES.TAB: {
        if (evt.shiftKey && (evt.target === this.refs.first)) {
          evt.preventDefault();
          if (this.singleButton) {
            this.refs.first.focus();
          }
          else  {
            this.refs.last.focus();
          }
        }
        if (!evt.shiftKey && (this.singleButton || evt.target === this.refs.last)) {
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
     this.refs.first.focus();
   }
 }

  render() {

    const {isModalOpen, modalType} = this.props.modal;
    if (isModalOpen && modalType === MODAL_TYPES.life) {
      return (
      ReactDOM.createPortal(
        <div className="modal" onClick={this.onLeaveButtons}>
          <div className='modal__wrapper'>
             <h2 className='modal__title'>Для хода через закрашенную клетку:</h2>
             <button className="modal__button btn" onClick={this.props.onDisabledClick} onKeyDown={this.onKeyDown} ref='first'>Использовать жизнь</button>
             <button className="modal__button btn" onClick={this.props.onModalCancel} onKeyDown={this.onKeyDown}  ref='last'>Отмена</button>
          </div>
        </div>,
        this.root)
      )
    } else if (isModalOpen && modalType === MODAL_TYPES.about) {
      return (ReactDOM.createPortal(
        <div className="modal" onClick={this.onLeaveButtons}>
          <div className='modal__wrapper modal__wrapper--about'>
             <h2 className='modal__title'>Конь-2018. Правила.</h2>
             <p className='modal__text'>Необходимо перемещаться конем, набирая очки. За "звезду": +1 очко, за "взрыв" квадрата конем: +1 очко.</p>
             <p className='modal__text'>Если число набранных очков кратно 25 - дается дополнительная жизнь.
             Доп. жизнью можно воспользоваться для хода по закрашенной клетке. Кисточка обозначает клетку, которая закрасится в начале следующего хода.</p>
             <p className='modal__text'>Игра заканчивается когда ходов и жизней больше нет.</p>
             <button className="modal__button btn" onClick={this.props.onModalCancel} onKeyDown={this.onKeyDown} ref='first'>Закрыть</button>
          </div>
        </div>,
        this.root)
     )
    }
    else {
      return (null)
    }
  }
}
