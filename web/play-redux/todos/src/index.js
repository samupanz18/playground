import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import todoApp from './reducers';
import {logger} from './middlewares';

const store = createStore(todoApp, applyMiddleware(logger));

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('canvas'));
