import React, { Component} from 'react';

import { sprite } from '../sprite.jsx'

class Cell extends Component {
	handleClick = (evt) => {
    let cell= evt.target;
    if (cell.hasAttribute('tabIndex') && cell.getAttribute('tabIndex') === '-1') {
      this.props.onModalShow(this.props.id);
    } else {
		  this.props.onCellClick(this.props.id);
    }
	}

	render () {
		const {title, clickable, svg, disabled} = this.props;
		return (
			<div
				className={'board__cell ' + (disabled ? 'board__cell--disabled' : '')}
				title={title}
				tabIndex={clickable ? '0' : '-1'}
				onClick = {this.handleClick}>
				{ sprite(svg, '100%') }
			</div>)
	}
}

export default  Cell;
