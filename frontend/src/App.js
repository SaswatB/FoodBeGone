import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Map } from './pages/map/Map';
import { About } from './pages/about/About';
import { Users } from './pages/users/Users';

export default function App() {
  return (
    <Router>
      <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Map />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}