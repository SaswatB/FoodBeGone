import React from 'react';
import "./ItemTemplateForm.css"

export function ItemTemplateForm () {
    return (<section class="about">
    <div class="helper"></div><div class="vertical-center">
      <h3>Upload Item</h3>
 
    <label for="file-upload" class="custom-file-upload">Choose a file</label>
    <input type="file" id="file-upload"/>
      
    <form action="/action_page.php">
      <div class="uploadset">
        <div class="upload">
          <span class="title item">Item: </span>
  
          <div class="bar">
              <span class="input"><input id="item-input" class="form" placeholder="Item Name (ex- Burrito)" type="text"/></span>
          </div>
        </div>
  
        <div class="upload">
          <span class="title address">Address: </span>
  
          <div class="bar">
              <span class="input"><input id="address-input" class="form" placeholder="Your Store Address" type="text"/></span>
          </div>
        </div> 
        
        <div class="upload">
          <span class="title price">Price: </span>
  
          <div class="bar">
              <span class="input"><input id="price-input" class="form" placeholder="Your Market Price ($40 -> type 40)" type="text"/></span>
          </div>
        </div>
  
        <div class="upload">
          <span class="title price">Discount Rate: </span>
  
          <div class="bar">
              <span class="input"><input id="discount-input" class="form" placeholder="Discount Rate (50% -> type 0.5)" type="text"/></span>
          </div>
        </div>
  
        <div class="upload">
          <span class="title price">Final Price: </span>
  
          <div class="bar">
              <span class="input"><input id="final-input" class="form" placeholder="Final Price with Discout Rate ($20 -> 20)" type="text"/></span>
          </div>
        </div>
      
        <div class="upload">
          <span class="title available">Available Units: </span>
  
          <div class="bar">
              <span class="input"><input id="available-input" class="form" placeholder="Quantity Available for sale (ex- 2)" type="text"/></span>
          </div>
        </div>
  
        <input type="button" class="submit" value="Upload"/>
       </div>
    </form>
    </div>        
  </section>)
}