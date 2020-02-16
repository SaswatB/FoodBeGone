import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import DatePicker from 'react-datepicker'
import { SERVER } from "../../constants";
import "./ItemInformationForm.css";

import "react-datepicker/dist/react-datepicker.css";

export function ItemInformationForm() {
  const [itemTemplates, setItemTemplates] = useState();
  const [selectedTemplateId, setSelectedTemplateId] = useState();
  
  useEffect(() => {
    const call = async () => {
      const templates = (await axios.get(`http://${SERVER}/users/4f43acf0-5df7-45c7-b759-6d42cacf6f2a/items/templates`)).data
      setItemTemplates(templates);
    };
    call();
  }, []);

  const [discount, setDiscount] = useState();
  const [count, setCount] = useState();
  const [availableTill, setAvailableTill] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const submitItem = async () => {
    await axios.post(
      `http://${SERVER}/users/4f43acf0-5df7-45c7-b759-6d42cacf6f2a/items`,
      {
        count,
        count_left: count,
        item_template_id: selectedTemplateId,
        "available_til": availableTill.toISOString().replace('Z', ''),
        "disc_percent": discount,
      }
    );
    // set a message and clear all form data
    setSuccessMessage(`Item added!`);
    setSelectedTemplateId();
    setDiscount();
    setCount();
  };

  return (
    <section class="about">
      <div class="helper"></div>
      <div class="vertical-center">
        <h3>Upload Item</h3>

        {successMessage && (
          <h4 className="success-message">
            <i className="material-icons">check_circle</i> {successMessage}
          </h4>
        )}

        <form
          onSubmit={event => {
            event.preventDefault();
            submitItem();
          }}
        >
          <div class="uploadset" style={{marginTop: '20px'}}>
            <div class="upload">
              <span class="title price">Template: </span>

              <div class="bar">
                <span class="input">
                <select className="item-add-form-select" value={selectedTemplateId} onChange={event => setSelectedTemplateId(event.target.value)}>
                  <option value=""></option>
                  {itemTemplates && itemTemplates.map((itemTemplate) => <option value={itemTemplate.item_templ_id} key={itemTemplate.item_templ_id}>{itemTemplate.name}</option>)}
                </select>
                </span>
              </div>
            </div>

            <div class="upload">
              <span class="title price">Discount Rate: </span>

              <div class="bar">
                <span class="input">
                  <input
                    id="discount-input"
                    class="form"
                    placeholder="Discount Rate (50% -> type 0.5)"
                    type="text"
                    value={discount}
                    onChange={event => setDiscount(event.target.value)}
                  />
                </span>
              </div>
            </div>

            <div class="upload">
              <span class="title available">Available Units: </span>

              <div class="bar">
                <span class="input">
                  <input
                    id="available-input"
                    class="form"
                    placeholder="Quantity Available for sale (ex- 2)"
                    type="text"
                    value={count}
                    onChange={event => setCount(event.target.value)}
                  />
                </span>
              </div>
            </div>

            <div class="upload">
              <span class="title available">Available Untill: </span>

              <div class="bar">
                <span class="input">
                <DatePicker
                  selected={availableTill}
                  onChange={date => setAvailableTill(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
                </span>
              </div>
            </div>

            <input type="submit" class="submit" value="Upload" />
          </div>
        </form>
      </div>
    </section>
  );
}
