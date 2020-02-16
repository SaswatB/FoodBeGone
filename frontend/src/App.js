import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { NavBar } from './components/navbar/NavBar';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { Map } from './pages/map/Map';
import { Items } from './pages/items/Items';
import { Users } from './pages/users/Users';
import { Transactions } from './pages/transactions/Transactions';
import { Confirmation } from "./pages/confirmation/Confirmation";
import { ItemTemplateForm } from "./pages/itemtemplateform/ItemTemplateForm";
import { ItemInformationForm } from './pages/iteminformationform/ItemInformationForm';
import { SupplierHome } from "./pages/supplierhome/SupplierHome";
import { Scanner } from "./pages/scanner/Scanner";

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
          <Route path="/itemtemplateform">
            <NavBar />
            <ItemTemplateForm />
          </Route>
          <Route path="/iteminformationform">
            <NavBar />
            <ItemInformationForm />
          </Route>
          <Route path="/transactions">
            <NavBar />
            <Transactions />
          </Route>
          <Route path="/confirmation/:transaction_id">
            <NavBar />
            <Confirmation />
          </Route>
          <Route path="/supplierhome">
            <NavBar />
            <SupplierHome />
          </Route>
          <Route path="/scanner">
            <NavBar />
            <Scanner />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Map />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}