import React from 'react';

import BoardContainer from './containers/BoardContainer';
import InfoContainer from './containers/InfoContainer';
import ModalContainer from './containers/ModalContainer';

import './App.css';

function App() {
    return (
        <main className='game'>
            <BoardContainer/>
            <InfoContainer/>
            <ModalContainer/>
        </main>
    );
}

export default App;
