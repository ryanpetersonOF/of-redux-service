import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';

import renderCounter from "./renderCounter";
import init from './utils';

const {createClientMiddleWare, connect, defaultReducer} = init({uuid: 'standard-service'});

// Create local store
const store = createStore(defaultReducer, NaN, applyMiddleware(createClientMiddleWare()));

// Render initial connecting message
ReactDOM.render(<div>connecting to service</div>, document.getElementById('root'));

// Wire store change listener
store.subscribe(renderCounter(store));

// Connect/setup client to provider
connect(store).then(() => console.log('connected to service'));