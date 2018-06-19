'use strict';

// the number of products to display on the page
Product.numToDisplay = 3;

// array to store the objects
Product.allProducts = [];

// keep track of all clicks
Product.totalClicks = 0;

// track previously displayed goats
Product.lastSet = [];

// track current set
Product.currSet = [];

// array to store names for the chart
Product.names = [];

// array to store votes for the chart
Product.totalValues = [];

// access the section element from the DOM
Product.sectionEl = document.getElementById('display-area');

// access the ul element from the DOM
Product.ulEl = document.getElementById('results');

// set up the constructor function
function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.votes = 0;
  this.timesDisplayed = 0;
  Product.allProducts.push(this);
}

// make new Goat instances
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

Product.randomProductDisplay = function() {
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
  // change the image elements in the DOM to match the filepaht and name from the randomly selected products
  Product.slot0El.src = Product.allProducts[Product.currSet[0]].filepath;
  Product.slot0El.alt = Product.allProducts[Product.currSet[0]].name;

  Product.slot1El.src = Product.allProducts[Product.currSet[1]].filepath;
  Product.slot1El.alt = Product.allProducts[Product.currSet[1]].name;

  Product.slot2El.src = Product.allProducts[Product.currSet[2]].filepath;
  Product.slot2El.alt = Product.allProducts[Product.currSet[2]].name;
};

Product.randomProductDisplay();