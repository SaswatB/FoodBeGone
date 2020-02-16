import React from "react";
import { useUser } from "../../utils/useUser";
import "./NavBar.css"

export function NavBar({showBack}) {
    const [, setUserId,, setUserType] = useUser();

    return (
    <nav>
        <ul>
          <li>
            {showBack !== false && <div onClick={() => window.history.back()} className="nav-back">❮ &nbsp; Back</div>}
          </li>
        </ul>
        <ul class="right hide-on-med-and-down">
          <li><a class="waves-effect waves-light" onClick={() => {setUserId(''); setUserType('');}}>Logout</a></li>
        </ul>
    </nav>);
}
