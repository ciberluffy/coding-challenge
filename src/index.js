import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';

import AppRouter from './routes'

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import root from './redux-saga/sagas';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
   reducer,
   applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(root)

function render() {
  ReactDOM.render(
    <StrictMode>
      <AppRouter store={store}/>
    </StrictMode>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
