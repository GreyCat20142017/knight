import React from 'react';
import { CONTENT } from '../constants'

import Cell from './Cell';
import './Board.css';

const Board = (props) => {
   const {cells, horse} = props.board;
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
              onCellClick={props.onCellClick}
              onModalShow={props.onModalShow} />
				  )}
			</div>
		)
}

export default Board;
