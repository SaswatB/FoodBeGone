import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { NavBar } from './components/navbar/NavBar';
import { Map } from './pages/map/Map';
import { About } from './pages/about/About';
import { Users } from './pages/users/Users';
import { Transactions } from './pages/transactions/Transactions';

export default function App() {
  return (
    <Router>
      <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
        <Switch>
          <Route path="/about">
            <NavBar />
            <About />
          </Route>
          <Route path="/users">
            <NavBar />
            <Users />
          </Route>
          <Route path="/transactions">
            <NavBar />
            <Transactions />
          </Route>
          <Route path="/">
            <Map />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}