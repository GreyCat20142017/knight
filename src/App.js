import React from 'react';


import BoardContainer from './containers/BoardContainer';
import InfoContainer from './containers/InfoContainer';

import './App.css';

function App() {
    return (
        <main className='game'>
            <BoardContainer/>     
            <InfoContainer/>     
        </main>
    );
}

export default App;