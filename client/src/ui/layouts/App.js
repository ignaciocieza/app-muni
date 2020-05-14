import React from 'react';
import Main from './Main';
import Header from './Header';
import AsideBar from './aside-bar/AsideBar';
import './app.styles.scss';

const App = () =>(
    <React.Fragment>
        <Header />
        <AsideBar/>
        <Main />
    </React.Fragment>
);

export default App;