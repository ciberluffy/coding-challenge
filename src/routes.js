import React from "react";
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Rocket from './containers/rocketDetailsPage'
import List from './containers/upcomingPage'

export default function AppRouter({store}) {
   return (
      <Provider store={store}>
         <Router>
            <div>
               <Switch>
                  <Route exact path="/:id" component={Rocket} />
                  <Route exact path="/" component={List} />
               </Switch>
            </div>
         </Router>
      </Provider>
   )
}
