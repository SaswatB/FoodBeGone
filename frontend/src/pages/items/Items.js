import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../../constants";
import "./Items.css"

export function Items() {
  const { supplier_id } = useParams();
  const [selectedQuantity, setSelectedQuantity] = useState({});
  const [items, setItems] = useState();
  // get items from the api
  useEffect(() => {
    const call = async () => setItems((await axios.get(`http://${SERVER}/users/${supplier_id}/items`)).data);
    call();
  }, [supplier_id])

  const history = useHistory();
  const submitOrder = async (item_id, purchased_count) => {
    const transaction = await axios.post(`http://${SERVER}/users/0/transactions`, {
      item_id,
      "buyer_id": "123",
      purchased_count,
      "token": "123"
    });
    history.push(`/confirmation/${transaction.id}`);
  };

  return (
    <div className="container">
      <div className="row">
        {items === undefined
          ? <>Loading...</>
          : items.length === 0
          ? <>No Items Available</>
          :
        items.map((item) => (
          <div className="col s12 m6" key={item.id}>
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src="https://i.imgur.com/jhKpeYH.jpg" alt="food" />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">{item.item_template.name} <a className="btn-floating red pulse right"><i className="material-icons right">add</i></a></span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4"><h1>Buy {item.item_template.name}</h1><i className="material-icons right">close</i></span>
                <h5>Seller:</h5>
                <h6>{item.item_template.user.name}</h6>
                <h5>Pickup Address:</h5>
                <h6>{item.item_template.user.address}</h6>
                <h5>Pickup Window:</h5>
                <h6>{item.item_template.user.open_time} - {item.item_template.user.close_time}</h6>
                <form className="card-form" onSubmit={(event) => {event.preventDefault(); submitOrder(item.id, selectedQuantity[item.id] || 1);}}>
                  <label htmlFor="quantity">Quantity (max {item.count_left}):</label>
                  <input type="number" id="quantity" name="quantity" min="1" max={item.count_left} value={selectedQuantity[item.id] || 1} onChange={(event) => setSelectedQuantity({...selectedQuantity, [item.id]: event.target.value})} />
                  <button className="btn waves-effect waves-light" type="submit" name="action">Reserve
                  <i className="material-icons right">send</i>
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
