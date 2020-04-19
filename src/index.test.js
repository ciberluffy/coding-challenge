import React from "react"
import { Provider } from "react-redux"
import { render } from "@testing-library/react"

import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import AppRouter from "./routes"
import root from "./redux-saga/sagas"
import reducer from "./reducers"

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(root)

it("renders without crashing", () => {
  const { getByText } = render(
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
  expect(getByText("Loading...")).toBeInTheDocument()
})
