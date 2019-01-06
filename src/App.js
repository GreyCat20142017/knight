import React from 'react';

import BoardContainer from './containers/BoardContainer';
import InfoContainer from './containers/InfoContainer';
import ModalContainer from './containers/ModalContainer';

import './App.css';

function App() {
    return (
        <main className='game'>
            <h2 className='game__title'>Конь-2018</h2>
            <BoardContainer/>
            <InfoContainer/>
            <ModalContainer/>
        </main>
    );
}

export default App;
