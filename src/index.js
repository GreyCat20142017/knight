import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import {getInitialState} from './functions.js';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const BOARD_SIDE = 8;
const CONTENT = {
  EMPTY: {clickable: true, svgName: 'none', title: 'свободно'}, 
  DISABLED: {clickable: false, svgName: 'none', title: 'занято'}, 
  HORSE: {clickable: false, svgName: 'horse', title: 'конь'},
  LITTER: {clickable: true, svgName: 'litter', title: 'клетка будет заблокирована в начале следующего хода'},
  STAR: {clickable: true, svgName: 'star', title: '+ 1 очко'}
};


const store = createStore(reducer, getInitialState(BOARD_SIDE * BOARD_SIDE, CONTENT));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
