import React from 'react';

import BoardContainer from './containers/BoardContainer';
import InfoContainer from './containers/InfoContainer';
import ModalContainer from './containers/ModalContainer';
import RecordsContainer from './containers/RecordsContainer';
import HeaderContainer from './containers/HeaderContainer';

import './App.css';

function App() {
    return (
        <main className='game'>
            <HeaderContainer/>
            <BoardContainer/>
            <InfoContainer/>
            <RecordsContainer/>
            <ModalContainer/>
        </main>
    );
}

export default App;
