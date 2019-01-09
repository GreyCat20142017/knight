import React from 'react';
import { CONTENT } from '../constants'
import { getMoveValidity } from '../functions';
import { sprite } from '../sprite'
import Cell from './Cell';
import './Board.css';

const Board = (props) => {
   const {cells, horse} = props.board;
   const {gameOver} = props.info;

		return (
			<div className='board'>
				  {cells.map((item, ind) =>
				  	 <Cell key={'id-' + ind}
              svg={item.content.svg}
              clickable={item.content.clickable}
              title={item.content.title}
              id = {ind}
              horse = {horse}
				  	  disabled={item.content === CONTENT.DISABLED}
              onCellClick={gameOver ? props.doNothing : props.onCellClick}
              onModalShow={gameOver || !getMoveValidity(horse, ind) ? props.doNothing : props.onModalShow} />
				  )}
          <div className={'board__end ' + (gameOver ? 'board__end--over': '')}>
            <p className='board__wrapper'>
            { sprite('horse', '100%') }
            </p>
         </div>
			</div>
		)

}

export default Board;
