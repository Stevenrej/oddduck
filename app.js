'use strict';

console.log('HI');

// ******** Global Variables *****
let voteCount = 25;
let duckArray = [];

//  ******* DOM REFERENCE *****

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('imgone');
let imgTwo = document.getElementById('imgtwo');
let imgThree = document.getElementById('imgthree');

let resultsBtn = document.getElementById('showresultsbtn');
let resultsContainer = document.getElementById('results-container');

// ******  Contructor ******

function Duck(name, fileExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.click = 0;

  duckArray.push(this);
}
// ***** Helper Function ****

function randomIndex() {
  return Math.floor(Math.random() * duckArray.length);
}

let indexArray = [];

function renderImg() {
  // let imgOneindex = randomIndex();
  // let imgTwoindex = randomIndex();
  // let imgThreeindex = randomIndex();

  while (indexArray.length < 6) {
    let randomnum = randomIndex();
    if (!indexArray.includes(randomnum)) {
      indexArray.push(randomnum);
    }
  }

  let imageOneindex = indexArray.shift();
  let imageTwoindex = indexArray.shift();
  let imageThreeindex = indexArray.shift();

  // while (imgOneindex === imgTwoindex ||imgThreeindex === imgTwoindex || imgThreeindex === imgOneindex) {
  //   imgTwoindex = randomIndex();
  //   imgOneindex = randomIndex();
  //   imgThreeindex = randomIndex();
  // }

  imgOne.src = duckArray[imageOneindex].img;
  imgTwo.src = duckArray[imageTwoindex].img;
  imgThree.src = duckArray[imageThreeindex].img;

  duckArray[imageOneindex].views++;
  duckArray[imageTwoindex].views++;
  duckArray[imageThreeindex].views++;

  imgOne.alt = duckArray[imageOneindex].name;
  imgTwo.alt = duckArray[imageTwoindex].name;
  imgThree.alt = duckArray[imageThreeindex].name;
}
// ****** Event handlers ****

function handleClick(event) {
  console.dir(event.target);
  let imgClicked = event.target.alt;

  for (let i = 0; i < duckArray.length; i++) {
    if (duckArray[i].name === imgClicked) {
      duckArray[i].click++;
    }
  }

  voteCount--;
  renderImg();
  if (voteCount === 0) {
    imgContainer.removeEventListener('click', handleClick);
    document.getElementById('imgone').style.display = 'none';
    document.getElementById('imgtwo').style.display = 'none';
    document.getElementById('imgthree').style.display = 'none';
    let clickresult = document.createElement('p');
    clickresult.textContent = 'Click View Results for Statistics!';
    imgContainer.appendChild(clickresult);
  }
}

function handleShowResults() {
  if (voteCount === 0) {
    for (let i = 0; i < duckArray.length; i++) {
      let liElem = document.createElement('li');
      liElem.textContent = `${duckArray[i].name.toUpperCase()} was seen ${duckArray[i].views} times and had ${duckArray[i].click} votes.`;
      resultsContainer.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}


// ***** Executable Code *******

new Duck('bag', 'jpg');
new Duck('banana', 'jpg');
new Duck('bathroom', 'jpg');
new Duck('boots', 'jpg');
new Duck('breakfast', 'jpg');
new Duck('bubblegum', 'jpg');
new Duck('chair', 'jpg');
new Duck('cthulhu', 'jpg');
new Duck('dog-duck', 'jpg');
new Duck('dragon', 'jpg');
new Duck('pen', 'jpg');
new Duck('pet-sweep', 'jpg');
new Duck('scissors', 'jpg');
new Duck('shark', 'jpg');
new Duck('sweep', 'png');
new Duck('tauntaun', 'jpg');
new Duck('unicorn', 'jpg');
new Duck('water-can', 'jpg');
new Duck('wine-glass', 'jpg');

renderImg();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
