import React, { useState, useRef } from "react";
import axios from "axios";
import { SERVER } from "../../constants";
import "./ItemTemplateForm.css";

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export function ItemTemplateForm() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [imageFile, setImageFile] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const c = useRef();
  c.current = setImageFile;

  const submitItemTemplate = async () => {
    await axios.post(
      `http://${SERVER}/users/4f43acf0-5df7-45c7-b759-6d42cacf6f2a/items/templates`,
      {
        name,
        description,
        price,
        image: imageFile.base64
      }
    );
    // set a message and clear all form data
    setSuccessMessage(`Item "${name}" saved successfully!`);
    setName();
    setDescription();
    setPrice();
    setImageFile();
  };

  const onImageChange = async file => {
    setImageFile({
      name: file.name,
      type: file.type,
      base64: await toBase64(file)
    });
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
          className="item-template-form"
          onSubmit={event => {
            event.preventDefault();
            submitItemTemplate();
          }}
        >
          {imageFile && <div className="upload-img-container"><img src={imageFile.base64} className="upload-img" alt="Food" /></div>}
          <label for="file-upload" class="custom-file-upload">
            {!imageFile ? "Choose a file" : `${imageFile.name} Selected`}
          </label>
          <input
            type="file"
            id="file-upload"
            onChange={event => onImageChange(event.target.files[0])}
          />

          <div class="uploadset">
            <div class="upload">
              <span class="title item">Item: </span>

              <div class="bar">
                <span class="input">
                  <input
                    id="item-input"
                    class="form"
                    placeholder="Item Name (ex- Burrito)"
                    type="text"
                    value={name}
                    onChange={event => setName(event.target.value)}
                  />
                </span>
              </div>
            </div>

            <div class="upload">
              <span class="title price">Price: </span>

              <div class="bar">
                <span class="input">
                  <input
                    id="price-input"
                    class="form"
                    placeholder="Your Market Price in cents ($40 -> type 4000)"
                    type="text"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                  />
                </span>
              </div>
            </div>

            <div class="upload">
              <span class="title available">Description: </span>

              <div class="bar">
                <span class="input">
                  <textarea
                    class="form"
                    placeholder="Item Description"
                    type="text"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
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
