import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Rocket from "./containers/rocketDetailsPage"
import List from "./containers/upcomingPage"

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
