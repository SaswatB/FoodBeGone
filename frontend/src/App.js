import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { NavBar } from './components/navbar/NavBar';
import { Map } from './pages/map/Map';
import { Items } from './pages/items/Items';
import { Users } from './pages/users/Users';
import { Transactions } from './pages/transactions/Transactions';
import { Confirmation } from "./pages/confirmation/Confirmation";

export default function App() {
  return (
    <Router>
      <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
        <Switch>
          <Route path="/items/:supplier_id">
            <NavBar />
            <Items />
          </Route>
          <Route path="/users">
            <NavBar />
            <Users />
          </Route>
          <Route path="/transactions">
            <NavBar />
            <Transactions />
          </Route>
          <Route path="/confirmation/:transaction_id">
            <NavBar />
            <Confirmation />
          </Route>
          <Route path="/">
            <Map />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}