import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './api/store';
import App from './ui/layouts/App';
import history from './api/history';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Router>
    </Provider>
    ,
    document.getElementById('root')
);
