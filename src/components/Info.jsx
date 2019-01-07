import React from 'react';

import './Info.css';

const Info = (props) => {
   const {score, life} = props.info;

		return (
			<div className='info'>
        <div className='info__wrapper'>
				 <span className='info__span info__span--score'>Счет: {score}</span>
				 <button className='info__button info__button--start btn btn--small' type='button' title='Перезапустить игру' onClick={props.onStart}>Старт</button>
				 <span className='info__span info__span--life' title='Жизнь используется для прорыва через заблокированное поле'>Жизни: {life}</span>
         </div>
			</div>
			)
}

export default Info;
