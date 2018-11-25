import React, { Component} from 'react';

import { sprite } from '../sprite.jsx'

export default class Cell extends Component {
	handleClick = () => {
		// let isValidMove = getMoveValidity(this.props.horseLocation, this.props.id);
		this.props.onCellClick(this.props.id);
	}

	render () {
		const {title, clickable, svg} = this.props;
		return (<div className='board__cell' title={title} tabIndex={clickable ? '0' : '-1'}  onClick = {this.handleClick}>	
		 { sprite(svg, '100%') }
	</div>)
 }		
}