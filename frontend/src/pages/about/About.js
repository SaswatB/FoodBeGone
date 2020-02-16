import React from "react";

export function About() {
  return (
    <div class="container">
    <div class="row">

      <div class="col s12 m6">

        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="https://i.imgur.com/jhKpeYH.jpg" alt="food"/>
          </div>
          <div class="card-content">

            <span class="card-title activator grey-text text-darken-4">Stew <a class="btn-floating red pulse right"><i class="material-icons right">add</i></a></span>


          </div>
          <div class="card-reveal">

            <span class="card-title grey-text text-darken-4"><h1>Buy Stew?</h1><i class="material-icons right">close</i></span>
            <h4>Pickup Address:</h4>
            <h5>123 Tasty Lane</h5>
            <h5>San Francisco, CA 94102</h5>

            <form>
              <label for="quantity">Quantity (between 1 and 5):</label>
              <input type="number" id="quantity" name="quantity" min="1" max="5" value="1" />
              <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
              </button>
            </form>

          </div>
        </div>

      </div>
      <div class="col s12 m6">

        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="https://i.imgur.com/b0awqEb.jpg" alt="food"/>
          </div>
          <div class="card-content">

            <span class="card-title activator grey-text text-darken-4">Hummus<a class="btn-floating red pulse right"><i class="material-icons right">add</i></a></span>

          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Buy Hummus?<i class="material-icons right">close</i></span>
            <h4>Pickup Address:</h4>
            <h5>555 Fremont St</h5>
            <h5>San Francisco, CA 94103</h5>

            <form>
              <label for="quantity">Quantity (between 1 and 5):</label>
              <input type="number" id="quantity" name="quantity" min="1" max="5" value="1" />
              <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
              </button>
            </form>

          </div>
        </div>

      </div>

  </div>


    <div class="row">

      <div class="col s12 m6">

        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="https://i.imgur.com/OHfIoYI.jpg" alt="food"/>
          </div>
          <div class="card-content">

            <span class="card-title activator grey-text text-darken-4">Garlic Knots<a class="btn-floating red pulse right"><i class="material-icons right">add</i></a></span>

          </div>
          <div class="card-reveal">

            <span class="card-title grey-text text-darken-4"><h1>Buy Garlic Knots?</h1><i class="material-icons right">close</i></span>
            <h4>Pickup Address:</h4>
            <h5>999 Twisted Road</h5>
            <h5>San Francisco, CA 94108</h5>

            <form>
              <label for="quantity">Quantity (between 1 and 21):</label>
              <input type="number" id="quantity" name="quantity" min="1" max="5" value="1" />
              <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
              </button>
            </form>

          </div>
        </div>

      </div>
      <div class="col s12 m6">

        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="https://i.imgur.com/c5RoIbL.jpg" alt="food"/>
          </div>
          <div class="card-content">

            <span class="card-title activator grey-text text-darken-4">Lemon Chicken Piccata<a class="btn-floating red pulse right"><i class="material-icons right">add</i></a></span>

          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Buy Lemon Chicken Piccata?<i class="material-icons right">close</i></span>
            <h4>Pickup Address:</h4>
            <h5>1047 Violet Way</h5>
            <h5>San Francisco, CA 94105</h5>

            <form>
              <label for="quantity">Quantity (between 1 and 10):</label>
              <input type="number" id="quantity" name="quantity" min="1" max="5" value="1" />
              <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
              </button>
            </form>

          </div>
        </div>

      </div>

  </div>
</div>
  );
}
