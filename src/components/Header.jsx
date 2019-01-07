import React from 'react';

import { sprite } from '../sprite.jsx'
import './Header.css';

const Header = (props) => {

		return (
			<header className='header'>
        <div className='header__wrapper'>
        <h2 className='header__title'>Конь-2018</h2>
				 <button
          className='header__button header__button--undo'
          type='button'
          title='Отмена последнего хода'
          onClick={props.onUndo}
          disabled = {!props.undoState}>
          <span className='visually-hidden'>Отменить ход</span>
          { sprite('undo', '24px') }
        </button>
        <button
          className='header__button header__button--about'
          type='button'
          title='Правила игры'
          onClick={props.onAboutShow}>
          <span className='visually-hidden'>О программе</span>
          { sprite('help', '24px') }
        </button>
         </div>
			</header>
			)
}

export default Header;
