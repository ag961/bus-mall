'use strict';

const imgElemLeft = document.getElementById('left_item_image');
const h2ElemLeft = document.getElementById('left_item_h2');
const imgElemMiddle = document.getElementById('middle_item_image');
const h2ElemMiddle = document.getElementById('middle_item_h2');
const imgElemRight = document.getElementById('right_item_image');
const h2ElemRight = document.getElementById('right_item_h2');
const resultsUlElem = document.getElementById('results');
const allChoicesSectionElem = document.getElementById('all_choices');
const resultButtonElem = document.getElementById('resultButton');

let counterTotal = 0;

let currentLeftItem = null;
let currentMiddleItem = null;
let currentRightItem = null;

function Product (imgPath, h2description) {

  this.imagePath = imgPath;
  this.description = h2description;
  this.votes = 0;
  this.timeshow = 0;

  Product.itemsArray.push(this);
 
  
}

Product.itemsArray = [];


Product.prototype.renderSingleItem = function(image, h2){

  image.src = this.imagePath;
  h2.textContent = this.description;
};

function renderThreeImages (itemLeft, itemMiddle, itemRight){

  itemLeft.renderSingleItem(imgElemLeft, h2ElemLeft);
  itemMiddle.renderSingleItem(imgElemMiddle, h2ElemMiddle);
  itemRight.renderSingleItem(imgElemRight, h2ElemRight);
}

function pickProduct () {

  let currentItemsArray = [];

  currentItemsArray.push(currentLeftItem);
  currentItemsArray.push(currentMiddleItem);
  currentItemsArray.push(currentRightItem);

  while (currentItemsArray.includes(currentLeftItem)){

    let leftProductIndex = Math.floor(Math.random()*Product.itemsArray.length);
    currentLeftItem = Product.itemsArray[leftProductIndex];
  }
  currentItemsArray.push(currentLeftItem);

  while (currentItemsArray.includes(currentMiddleItem)){
    let middleProductIndex = Math.floor(Math.random()*Product.itemsArray.length);
    currentMiddleItem = Product.itemsArray[middleProductIndex];
  }
  currentItemsArray.push(currentMiddleItem);

  while (currentItemsArray.includes(currentRightItem)){
    let rightProductIndex = Math.floor(Math.random()*Product.itemsArray.length);
    currentRightItem = Product.itemsArray[rightProductIndex];
  }

  renderThreeImages (currentLeftItem, currentMiddleItem, currentRightItem);

  currentLeftItem.timeshow++;
  currentMiddleItem.timeshow++;
  currentRightItem.timeshow++;
}

new Product('./img/bag.jpg', 'bag');
new Product('./img/banana.jpg', 'banana');
new Product('./img/bathroom.jpg', 'bathroom');
new Product('./img/boots.jpg', 'boots');
new Product('./img/breakfast.jpg', 'breakfast');
new Product('./img/bubblegum.jpg', 'bubblegum');
new Product('./img/chair.jpg', 'chair');
new Product('./img/cthulhu.jpg', 'cthulhu');
new Product('./img/dog-duck.jpg', 'dog-duck');
new Product('./img/dragon.jpg', 'dragon');
new Product('./img/pen.jpg', 'pen');
new Product('./img/pet-sweep.jpg', 'pet-sweep');
new Product('./img/scissors.jpg', 'scissors');
new Product('./img/shark.jpg', 'shark');
new Product('./img/sweep.png', 'sweep');
new Product('./img/tauntaun.jpg', 'tauntaun');
new Product('./img/unicorn.jpg', 'unicorn');
new Product('./img/water-can.jpg', 'water-can');
new Product('./img/wine-glass.jpg', 'wine-glass');





function renderResults (){

  resultsUlElem.innerHTML = '';

  let newH2Elem = document.createElement('h2');
  newH2Elem.textContent = 'Here are your results';
  resultsUlElem.appendChild(newH2Elem);

  for (let i=0; i < Product.itemsArray.length; i++){
    let newLiElem = document.createElement('li');    
    newLiElem.textContent = `${Product.itemsArray[i].description} had ${Product.itemsArray[i].votes} votes and was seen ${Product.itemsArray[i].timeshow} times.`;
    resultsUlElem.appendChild(newLiElem);
  }




}

function handleClick (e) {

  let objectClicked = e.target;
  if (counterTotal <25){
    if (objectClicked === imgElemLeft || objectClicked === imgElemMiddle || objectClicked === imgElemRight) {

      counterTotal++;

      if (objectClicked === imgElemLeft){
        currentLeftItem.votes++;
      } else if (objectClicked === imgElemMiddle){
        currentMiddleItem.votes++;
      } else {
        currentRightItem.votes++;
      }

      pickProduct();

    } else {
      alert('Missed the picture!');
    }
  } else {
    allChoicesSectionElem.removeEventListener('click', handleClick);
    alert('Voting ended.');
    renderResults();
  }
}

function handleResultButton(){
  renderResults();
}

allChoicesSectionElem.addEventListener('click', handleClick);

resultButtonElem.addEventListener('click', handleResultButton);

pickProduct();
renderThreeImages (currentLeftItem, currentMiddleItem, currentRightItem);


const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: Product.description,
    datasets: [{
      label: '# of Votes',
      data: Product.votes,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

