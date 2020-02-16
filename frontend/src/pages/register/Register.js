import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css"

export function Register() {
  const [userType, setUserType] = useState();

  return (
    <div className="login-page">
      <div className="row login-container">
        <h4>Welome!</h4><br/>
        {!userType ?
          (<div>
            Are you a &nbsp;
            <button class="btn waves-effect waves-light" onClick={() => setUserType('buyer')}>Buyer</button> 
            &nbsp;or a &nbsp;
            <button class="btn waves-effect waves-light" onClick={() => setUserType('supplier')}>Supplier</button>
            &nbsp;?
          </div>)
          : <>/</>
        }
        <br/>
        <Link class="waves-effect waves-teal btn-flat" to={`/login`}>Back to Login</Link>
      </div>
    </div>
  );
}
