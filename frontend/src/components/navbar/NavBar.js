import React from "react";
import { Link } from "react-router-dom";

export function NavBar() {
    return (
    <nav>
        <ul>
          <li>
            <Link to="/">❮ &nbsp; Back to Map</Link>
          </li>
        </ul>
    </nav>);
}
