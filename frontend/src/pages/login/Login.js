import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useUser } from "../../utils/useUser";
import "./Login.css"

export function Login() {
    const [, setUserId,, setUserType] = useUser(false);
    const history = useHistory();
    const login = () => {
      setUserId(1)
      setUserType('buyer');
      history.push('/');
  };

  return (
    <div className="login-page">
      <div className="row login-container">
        <h4>Login</h4><br/>
        <form className="col s12" onSubmit={(event) => { event.preventDefault(); login() }}>
          <div className="input-field">
            <i className="material-icons prefix">account_circle</i>
            <input id="icon_prefix" type="text" className="validate" />
            <label htmlFor="icon_prefix">First Name</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">phone</i>
            <input id="lock" type="password" className="validate" />
            <label htmlFor="lock">Password</label>
          </div>
          <button class="btn waves-effect waves-light login-button" type="submit" name="action">Login</button>
          {/* <Link class="waves-effect waves-teal btn-flat" to={`/register`}>Register</Link> */}
        </form>
      </div>
    </div>
  );
}
