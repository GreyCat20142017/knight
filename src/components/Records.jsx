import React from 'react';

import './Records.css';

const Records = (props) => {
   const table = props.records;
		return (
			<div className='records'>
         <p className='records__row records__row--header'>
				  <span className='records__cell records__cell--left'>Игрок</span>
				  <span className='records__cell records__cell--right' >Счет</span>
         </p>
         <ul className='records__rows'>
           {table.map((item, ind) => (
              <li className='records__row' key={ind}>
               <span className='records__cell records__cell--left'>{item.name}</span>
               <span className='records__cell records__cell--right' >{item.result}</span>
              </li>
            )
         )}
        </ul>
			</div>
			)
}

export default Records;
