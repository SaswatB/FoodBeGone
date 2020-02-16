import React, { useState } from "react";
import "./About.css"

export function About() {
  const [items, setItems] = useState([
    {
      count_left: 2,
      count: 3,
      template: {
        name: 'Tomato',
        seller: {
          name: "San Francisco Museum of Modern Art",
          address: "151 3rd St, San Francisco, CA 94103",
          open_time: '6:00 PM',
          close_time: '8:00 PM',
	
        }
      }
    }
  ]);
  // todo call api
  return (
    <div class="container">
      <div class="row">
        {items.map((item) => (
          <div class="col s12 m6">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="https://i.imgur.com/jhKpeYH.jpg" alt="food" />
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">{item.template.name} <a class="btn-floating red pulse right"><i class="material-icons right">add</i></a></span>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4"><h1>Buy {item.template.name}</h1><i class="material-icons right">close</i></span>
                <h5>Seller:</h5>
                <h6>{item.template.seller.name}</h6>
                <h5>Pickup Address:</h5>
                <h6>{item.template.seller.address}</h6>
                <h5>Pickup Window:</h5>
                <h6>{item.template.seller.open_time} - {item.template.seller.close_time}</h6>
                <form className="card-form">
                  <label for="quantity">Quantity (max {item.count_left}):</label>
                  <input type="number" id="quantity" name="quantity" min="1" max={item.count_left} value="1" />
                  <button class="btn waves-effect waves-light" type="submit" name="action">Reserve
                  <i class="material-icons right">send</i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
