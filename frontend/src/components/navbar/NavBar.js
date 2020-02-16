import React from "react";
import "./NavBar.css"

export function NavBar() {
    return (
    <nav>
        <ul>
          <li>
            <div onClick={() => window.history.back()} className="nav-back">❮ &nbsp; Back</div>
          </li>
        </ul>
    </nav>);
}
