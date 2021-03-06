'use strict';

// the number of products to display on the page
Product.numToDisplay = 3;

// the number of times to choose
Product.timesToClick = 25;

// keep track of all clicks
Product.totalClicks = 0;

// array to store the objects
// contains objects
Product.allProducts = [];

// track previously displayed set
// contains numbers
Product.lastSet = [];

// track current set
// contains numbers
Product.currSet = [];

// for displaying the votes for each item at the end
// contains numbers
Product.totalVotes = [];

// array to store names for the chart
// contains strings
Product.names = [];

// access the section element from the DOM
Product.sectionEl = document.getElementById('display-area');

// access the ul element from the DOM
Product.ulEl = document.getElementById('results');

// set up the constructor function
function Product(name, filepath) {
  this.name = name;
  Product.names.push(name);
  this.filepath = filepath;
  this.votes = 0;
  this.timesDisplayed = 0;
  Product.allProducts.push(this);
  this.allProductsIndex = Product.allProducts.indexOf(this);
}

// make new Product instances
new Product('R2D2 bag', 'img/bag.jpg');
new Product('Banana slicer', 'img/banana.jpg');
new Product('Bathroom stand', 'img/bathroom.jpg');
new Product('Rain boots', 'img/boots.jpg');
new Product('Breakfast machine', 'img/breakfast.jpg');
new Product('Bubblegum', 'img/bubblegum.jpg');
new Product('Chair', 'img/chair.jpg');
new Product('Cthulhu', 'img/cthulhu.jpg');
new Product('Dog duck beak', 'img/dog-duck.jpg');
new Product('Dragon meat', 'img/dragon.jpg');
new Product('Pen utensils', 'img/pen.jpg');
new Product('Sweeping pet', 'img/pet-sweep.jpg');
new Product('Scissors for pizza', 'img/scissors.jpg');
new Product('Shark sleeper', 'img/shark.jpg');
new Product('Sweeping baby', 'img/sweep.png');
new Product('Tauntaun sleeper', 'img/tauntaun.jpg');
new Product('Unicorn meat', 'img/unicorn.jpg');
new Product('USB tentacle', 'img/usb.gif');
new Product('Water can', 'img/water-can.jpg');
new Product('Wine glass', 'img/wine-glass.jpg');

// access the img elements from the DOM
Product.slot0El = document.getElementById('slot0');
Product.slot1El = document.getElementById('slot1');
Product.slot2El = document.getElementById('slot2');

Product.createRandomSet = function() {
  // while the current set isn't full
  while (Product.currSet.length < Product.numToDisplay) {
    //generate a random index
    var randomIndex = Math.floor(Math.random() * Product.allProducts.length);
    // if the generated index is not in the current set nor the previous set, add it to the current set
    if(!(Product.currSet.includes(randomIndex)
        || Product.lastSet.includes(randomIndex))) {
      Product.currSet.push(randomIndex);
    }
  }
};

Product.renderCurrSet = function() {
  // change the image elements in the DOM to match the filepath and name from the randomly selected products
  Product.slot0El.src = Product.allProducts[Product.currSet[0]].filepath;
  Product.slot0El.alt = Product.allProducts[Product.currSet[0]].name;
  Product.allProducts[Product.currSet[0]].timesDisplayed += 1;


  Product.slot1El.src = Product.allProducts[Product.currSet[1]].filepath;
  Product.slot1El.alt = Product.allProducts[Product.currSet[1]].name;
  Product.allProducts[Product.currSet[1]].timesDisplayed += 1;

  Product.slot2El.src = Product.allProducts[Product.currSet[2]].filepath;
  Product.slot2El.alt = Product.allProducts[Product.currSet[2]].name;
  Product.allProducts[Product.currSet[2]].timesDisplayed += 1;
};

// pushes each Product object's votes into the totalVotes array
Product.finalizeVotes = function() {
  for(var i in Product.allProducts) {
    Product.totalVotes.push(Product.allProducts[i].votes);
  }
};

Product.handleClick = function(event) {
  // increment total clicks
  Product.totalClicks += 1;

  // update the selections remaining above the display area
  document.getElementById('selections-remaining').innerText = Product.timesToClick - Product.totalClicks;

  // place the current set into the last set array
  Product.lastSet = Product.currSet;
  // empty the current set array
  Product.currSet = [];

  // loop through allProducts to check for the product that was voted on
  for(var i in Product.allProducts) {
    // determine which product was clicked on
    if(event.target.alt === Product.allProducts[i].name) {
      // increment its number of votes
      Product.allProducts[i].votes++;
    }
  }

  // if the max number of clicks has not been reached
  if(Product.totalClicks < Product.timesToClick) {
    // display a new choice
    Product.createRandomSet();
    Product.renderCurrSet();
  } else {
    // else max clicks reached, disable event listener and display results
    Product.sectionEl.removeEventListener('click', Product.handleClick);
    Product.finalizeVotes();
    Product.renderChart();
  }
};

Product.pageLoadCheckLocalStorage = function() {
  // if there is stored local data
  if(localStorage.getItem('allProductObjects') !== null) {
    // load it
    Product.loadLocalStorage();
  // else there is no data, so create it
  } else {
    // create new local storage
    Product.saveLocalStorage();
  }
};

Product.saveLocalStorage = function() {
  console.log('saving local data');
  // stringify all the Product objects in the allProducts array
  var stringifiedAllProducts = JSON.stringify(Product.allProducts);
  // pass the stringified array into local storage
  localStorage.setItem('allProductObjects', stringifiedAllProducts);
};

Product.loadLocalStorage = function() {
  console.log('local data detected - loading');
  // get the item in local storage and put it into a variable
  var stringifiedAllProducts = localStorage.getItem('allProductObjects');
  // parse the item retrieved
  Product.allProducts = JSON.parse(stringifiedAllProducts);
};

// add event listener to the section
Product.sectionEl.addEventListener('click', Product.handleClick);

// on page load, check whether there is already local storage data
Product.pageLoadCheckLocalStorage();
//create a random set to display on pageload
Product.createRandomSet();
// render the random set on pageload
Product.renderCurrSet();


// method to render the chart on the screen
Product.renderChart = function() {
  // save the current state to local storage
  Product.saveLocalStorage();

  // change the display area's display to none so the chart replaces it
  document.getElementById('display-area').style.display = 'none';
  document.getElementById('selections-remaining-section').style.display = 'none';

  var context = document.getElementById('results-chart').getContext('2d');

  // 4 rainbow colors repeated 5 times to cover all 20 images
  var chartColors = ['red', 'orange', 'yellow', 'green', 'blue',
    'red', 'orange', 'yellow', 'green', 'blue',
    'red', 'orange', 'yellow', 'green', 'blue',
    'red', 'orange', 'yellow', 'green', 'blue',];

  var productChart = new Chart(context, { // eslint-disable-line
    type: 'bar',
    data : {
      labels: Product.names,
      datasets: [{
        label: 'Product Votes',
        data: Product.totalVotes,
        backgroundColor: chartColors,
      }],
    },
    options: {
      scales: {
        yAxes: [{
          tick: {
            beginAtZero: true,
          }
        }],
        xAxes: [{
          ticks: {
            // ensures all names appear along chart bottom
            autoSkip: false
          }
        }]
      }
    }
  });
};