window.onload = function() {
  document.getElementById('button-next').addEventListener("click", toNext);
}

function toNext() {
  let universeArr = strToArr(getUserInput());

  if (!isValidUniverse(universeArr)){
    alert('not a valid input');
    return
  }
  
  setLocalStorage();
  window.location.href = "universe.html";
}

function getUserInput() {
  return document.getElementById('initial_universe').value;
};

function setLocalStorage() {
  let userInput = getUserInput();
  localStorage.setItem('userInput', userInput);
};

function strToArr() {
  // make '0100\n1000' to [ '0100', '1000'], then [[ '0', '1', '0', '0' ], [ '1', '0', '0', '0']]
  let userInput = getUserInput();

  let strArrays = userInput.split('\n').map(element => element.split(''));

  // make elements inside array from string to int
  for (i in strArrays) {
    for (j in strArrays[i]) {
      strArrays[i][j] = parseInt(strArrays[i][j]);
    }
  }
  return strArrays
}

function isValidUniverse(arrays) {

  // nested arrays should all be in same length
  for (let array of arrays) {
    if (array.length !== arrays[0].length) {
      return false;
    }
  }

  // nested array's individual value should be either 0 or 1
  for (let array of arrays) {
    for (let value of array) {
      if (value !== 0 && value !== 1) {
        return false;
      }
    }
  }
  return true;
}