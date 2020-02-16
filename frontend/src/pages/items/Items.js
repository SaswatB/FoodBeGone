import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../../constants";
import "./Items.css"

export function Items() {
  const { supplier_id } = useParams();
  const [items, setItems] = useState();
  // get items from the api
  useEffect(() => {
    const call = async () => setItems((await axios.get(`http://${SERVER}/users/${supplier_id}/items`)).data);
    call();
  }, [supplier_id])

  return (
    <div class="container">
      <div class="row">
        {items === undefined
          ? <>Loading...</>
          : items.length === 0
          ? <>No Items Available</>
          :
        items.map((item) => (
          <div class="col s12 m6">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="https://i.imgur.com/jhKpeYH.jpg" alt="food" />
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">{item.item_template.name} <a class="btn-floating red pulse right"><i class="material-icons right">add</i></a></span>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4"><h1>Buy {item.item_template.name}</h1><i class="material-icons right">close</i></span>
                <h5>Seller:</h5>
                <h6>{item.item_template.user.name}</h6>
                <h5>Pickup Address:</h5>
                <h6>{item.item_template.user.address}</h6>
                <h5>Pickup Window:</h5>
                <h6>{item.item_template.user.open_time} - {item.item_template.user.close_time}</h6>
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
