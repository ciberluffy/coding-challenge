import React from "react"
import { Provider } from "react-redux"
import ReactDOM from "react-dom"
import "./style/index.css"

import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import AppRouter from "./routes"

import root from "./redux-saga/sagas"
import reducer from "./reducers"

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(root)

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>,
    document.getElementById("root")
  )
}

render()
store.subscribe(render)
