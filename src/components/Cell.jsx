import React, { Component} from 'react';

import { sprite } from '../sprite.jsx'

export default class Cell extends Component {
	handleClick = () => {
		this.props.onCellClick(this.props.id);
	}

	render () {
		const {title, clickable, svg, disabled} = this.props;
		return (
			<div className={'board__cell ' + (disabled ? 'board__cell--disabled' : '')} title={title} tabIndex={clickable ? '0' : '-1'}  
				onClick = {this.handleClick}>	
				{ sprite(svg, '100%') }
			</div>)
	}		
}