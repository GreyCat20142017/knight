import React, {Fragment} from 'react';

import './Info.css';

const Info = (props) => {
   const {score, life, gameOver} = props.info;

		return (
      <Fragment>
       {gameOver ?
        (<div className='info'>
         <div className='info__wrapper info__wrapper--status'>
           <span className='info__span info__span--status'>Игра окончена: ходов нет!</span>
         </div>
        </div>)
       : null
       }
  			<div className='info'>
          <div className='info__wrapper'>
    				 <span className='info__span info__span--score'>Счет: {score}</span>
    				 <button className='info__button info__button--start btn btn--small' type='button' title='Перезапустить игру' onClick={props.onStart}>Старт</button>
    				 <span className='info__span info__span--life' title='Жизнь используется для прорыва через заблокированное поле'>Жизни: {life}</span>
           </div>
        </div>
      </Fragment>
			)
}

export default Info;
