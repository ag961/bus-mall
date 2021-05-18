'use strict';

const imgElemLeft = document.getElementById('left_item_image');
const h2ElemLeft = document.getElementById('left_item_h2');

const imgElemMiddle = document.getElementById('middle_item_image');
const h2ElemMiddle = document.getElementById('middle_item_h2');

const imgElemRight = document.getElementById('right_item_image');
const h2ElemRight = document.getElementById('right_item_h2');

const ulElem = document.getElementById('results');

const allChoicesSectionElem = document.getElementById('all_choices');


let counter = 0;

let currentLeftItem = null;
let currentMiddleItem = null;
let currentRightItem = null;


function ConstructItemObject (imgPath, h2description) {

  this.imagePath = imgPath;
  this.description = h2description;
  this.votes = 0;
  this.timeshow = 0;

  ConstructItemObject.itemsArray.push(this);

}

ConstructItemObject.itemsArray = [];

ConstructItemObject.prototype.renderSingleItem = function(image, h2){

  image.src = this.imagePath;
  h2.textContent = this.description;

};

function renderThreeImages (itemLeft, itemMiddle, itemRight){

  itemLeft.renderSingleItem(imgElemLeft, h2ElemLeft);
  itemMiddle.renderSingleItem(imgElemMiddle, h2ElemMiddle);
  itemRight.renderSingleItem(imgElemRight, h2ElemRight);

}

function pickProduct () {

  let leftProductIndex = Math.floor(Math.random()*ConstructItemObject.itemsArray.length);
  let middleProductIndex;
  let rightProductIndex;

  console.log(leftProductIndex);

  while (middleProductIndex === undefined || middleProductIndex === leftProductIndex) {
    middleProductIndex = Math.floor(Math.random()*ConstructItemObject.itemsArray.length);
    console.log(middleProductIndex);
  }

  while (rightProductIndex === undefined || (rightProductIndex === middleProductIndex || rightProductIndex === leftProductIndex)) {
    rightProductIndex = Math.floor(Math.random()*ConstructItemObject.itemsArray.length);
    console.log(rightProductIndex);
  }


  currentLeftItem = ConstructItemObject.itemsArray[leftProductIndex];
  currentMiddleItem = ConstructItemObject.itemsArray[middleProductIndex];
  currentRightItem = ConstructItemObject.itemsArray[rightProductIndex];



  renderThreeImages (currentLeftItem, currentMiddleItem, currentRightItem);

}

new ConstructItemObject('./img/bag.jpg', 'bag');
new ConstructItemObject('./img/bag.jpg', 'banana');
new ConstructItemObject('./img/bathroom.jpg', 'bathroom');
new ConstructItemObject('./img/boots.jpg', 'boots');
new ConstructItemObject('./img/breakfast.jpg', 'breakfast');
new ConstructItemObject('./img/bubblegum.jpg', 'bubblegum');
new ConstructItemObject('./img/chair.jpg', 'chair');
new ConstructItemObject('./img/cthulhu.jpg', 'cthulhu');
new ConstructItemObject('./img/dog-duck.jpg', 'dog-duck');
new ConstructItemObject('./img/dragon.jpg', 'dragon');
new ConstructItemObject('./img/pen.jpg', 'pen');
new ConstructItemObject('./img/pet-sweep.jpg', 'pet-sweep');
new ConstructItemObject('./img/scissors.jpg', 'scissors');
new ConstructItemObject('./img/shark.jpg', 'shark');
new ConstructItemObject('./img/sweep.png', 'sweep');
new ConstructItemObject('./img/tauntaun.jpg', 'tauntaun');
new ConstructItemObject('./img/unicorn.jpg', 'unicorn');
new ConstructItemObject('./img/water-can.jpg', 'water-can');
new ConstructItemObject('./img/wine-glass.jpg', 'wine-glass');



function handleClick (e) {
  
  let objectClicked = e.target;

  console.log(objectClicked);

  if (objectClicked === imgElemLeft || objectClicked === imgElemMiddle || objectClicked === imgElemRight) {
    counter++;

    if (objectClicked === imgElemLeft){
      currentLeftItem.vote++;
    } else


        renderThreeImages();
  } else {
    alert('Missed the picture!');
  }

 
}


allChoicesSectionElem.addEventListener('click', handleClick)




