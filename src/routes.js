import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Rocket from "./components/rocketDetail/rocketDetails"
import List from "./components/upcoming/upcoming"

export default function AppRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/:id" component={Rocket} />
          <Route exact path="/" component={List} />
        </Switch>
      </div>
    </Router>
  )
}
