import React from 'react';

import './Info.css';

const Info = (props) => {
   const {score, life} = props.info;

		return (
			<div className='info'>
				 <span className='info__score'>Счет: {score}</span>
				 <button className='info__start btn btn--small' type='button' title='Перезапустить игру' onClick={props.onStart}>Старт</button>
				 <span className='info__life' title='Жизнь используется для прорыва через заблокированное поле'>Жизни: {life}</span>
			</div>
			)
}

export default Info;
