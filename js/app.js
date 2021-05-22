'use strict';

//===================================== Global Variables ===================================

const imgElemLeft = document.getElementById('left_item_image');
const h2ElemLeft = document.getElementById('left_item_h2');
const imgElemMiddle = document.getElementById('middle_item_image');
const h2ElemMiddle = document.getElementById('middle_item_h2');
const imgElemRight = document.getElementById('right_item_image');
const h2ElemRight = document.getElementById('right_item_h2');
const resultsUlElem = document.getElementById('results');
const allChoicesSectionElem = document.getElementById('all_choices');
const resultButtonElem = document.getElementById('resultButton');
const chartDivElem = document.getElementById('chartDiv');

let counterTotal = 0;

let currentLeftItem = null;
let currentMiddleItem = null;
let currentRightItem = null;


//================================== Cunstructor Function ====================================

function Product (imgPath, h2description, votes, timeshow) {

  this.imagePath = imgPath;
  this.description = h2description;
  this.votes = votes;
  this.timeshow = timeshow;

}

Product.itemsArray = [];

Product.prototype.renderSingleItem = function(image, h2){

  image.src = this.imagePath;
  h2.textContent = this.description;
};


//=================================================== Functions ===============================

const addNewPoduct =  function (imgPath, tag, votes, timeshow){
  let product = new Product (imgPath, tag, votes, timeshow);
  Product.itemsArray.push(product);


};

function updateStorage (){
  const stringifiedProducts = JSON.stringify(Product.itemsArray);
  localStorage.setItem('keyItems', stringifiedProducts);
}

function getStuffOut (){
  let itemsFromStorage = localStorage.getItem('keyItems');

  if (itemsFromStorage){
    let parsedItems = JSON.parse(itemsFromStorage);
    console.log(parsedItems);
    for (let item of parsedItems){
      addNewPoduct(item.imagePath, item.description, item.votes, item.timeshow);
    }
/*     pickProduct();
    renderThreeImages (currentLeftItem, currentMiddleItem, currentRightItem); */

  } else {
    addNewPoduct ('./img/bag.jpg', 'bag', 0, 0);
    addNewPoduct ('./img/banana.jpg', 'banana', 0, 0);
    addNewPoduct ('./img/bathroom.jpg', 'bathroom', 0, 0);
    addNewPoduct ('./img/boots.jpg', 'boots', 0, 0);
    addNewPoduct ('./img/breakfast.jpg', 'breakfast', 0, 0);
    addNewPoduct ('./img/bubblegum.jpg', 'bubblegum', 0, 0);
    addNewPoduct ('./img/chair.jpg', 'chair', 0, 0);
    addNewPoduct ('./img/cthulhu.jpg', 'cthulhu', 0, 0);
    addNewPoduct ('./img/dog-duck.jpg', 'dog-duck', 0, 0);
    addNewPoduct ('./img/dragon.jpg', 'dragon', 0, 0);
    addNewPoduct ('./img/pen.jpg', 'pen', 0, 0);
    addNewPoduct ('./img/pet-sweep.jpg', 'pet-sweep', 0, 0);
    addNewPoduct ('./img/scissors.jpg', 'scissors', 0, 0);
    addNewPoduct ('./img/shark.jpg', 'shark', 0, 0);
    addNewPoduct ('./img/sweep.png', 'sweep', 0, 0);
    addNewPoduct ('./img/tauntaun.jpg', 'tauntaun', 0, 0);
    addNewPoduct ('./img/unicorn.jpg', 'unicorn', 0, 0);
    addNewPoduct ('./img/water-can.jpg', 'water-can', 0, 0);
    addNewPoduct ('./img/wine-glass.jpg', 'wine-glass', 0, 0);
  }

  pickProduct();
  renderThreeImages (currentLeftItem, currentMiddleItem, currentRightItem);

}

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

function renderChart() {

  chartDivElem.innerHTML = '';

  let newCanvasElem = document.createElement('canvas');
  newCanvasElem.setAttribute('id', 'myChart');
  chartDivElem.appendChild(newCanvasElem);

  const namesArray = [];
  const votesArray = [];
  const timeshowArray = [];

  for (let i = 0; i < Product.itemsArray.length; i++) {

    let name = Product.itemsArray[i].description;
    let vote = Product.itemsArray[i].votes;
    let shows = Product.itemsArray[i].timeshow;
    namesArray.push(name);
    votesArray.push(vote);
    timeshowArray.push(shows);
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: '# of Views',
        data: timeshowArray,
        backgroundColor: 'rgba(120, 240, 22, 0.205)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      },
      {
        label: '# of Votes',
        data: votesArray,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}

// ======================================== EVENT LISTENERS and HANDLERS ================================================

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
      updateStorage();

    } else {
      alert('Missed the picture!');
    }
  } else {
    allChoicesSectionElem.removeEventListener('click', handleClick);
    renderResults();
    renderChart();
  }
}

function handleResultButton(){
  renderResults();
  renderChart();
}

allChoicesSectionElem.addEventListener('click', handleClick);

resultButtonElem.addEventListener('click', handleResultButton);

//===================================== Object Instances =====================================

getStuffOut();




