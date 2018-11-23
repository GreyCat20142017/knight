import React from 'react';

import {sprite} from '../sprite.jsx'
import './Board.css';


const Cell = ({title, clickable, svgName}) => (
	<div className='board__cell' title={title} tabIndex={clickable ? '0' : '-1'}>	
		 { sprite(svgName, '100%') }
	</div>
)

const Board = (props) => {
   const boardState = props.cells;
		return (
			<div className='board'>
				  {boardState.map((item, ind) => 
				  	 <Cell key={'id-' + ind} svgName={item.svgName} clickable={item.clickable} title={item.title}/>			
				  )}	
			</div>
			)
}


export default Board;