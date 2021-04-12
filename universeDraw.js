window.onload = function() {
  universeInitial();
  document.getElementById('next-universe').addEventListener("click", nextUniverse);
};

let universeArr;
let universeStr;

function universeInitial() {
  getLocalStorage();
  makeUnivStr();
  changeNewUniv();

  function getLocalStorage() {
    let userInput = localStorage.getItem('userInput');
    universeArr = strToArr(userInput);
    function strToArr(userInput) {
      // make '0100\n1000' to [ '0100', '1000'], then [[ '0', '1', '0', '0' ], [ '1', '0', '0', '0']]
    
      let strArrays = userInput.split('\n').map(element => element.split(''));
    
      // make elements inside array from string to int
      for (i in strArrays) {
        for (j in strArrays[i]) {
          strArrays[i][j] = parseInt(strArrays[i][j]);
        }
      }
    
      return strArrays
    }
  }
};

function nextUniverse() {
  makeNextUnivArr();
  makeUnivStr();
  changeNewUniv();
};

function makeNextUnivArr() {

  // coordinate equals to arrays[x][y]
  // x & y is not conventional! so be careful.

  let nextUnivArr = [];

  const possibilities = [
    [-1,-1],
    [-1,0],
    [-1,1],
    [0,-1],
    [0,1],
    [1,-1],
    [1,0],
    [1,1]
  ];

  const xMax = universeArr.length;
  const yMax = universeArr[0].length;

  for (let i=0; i < xMax; i++) {
    let nextUnivArrRow = [];
    for (let j=0; j < yMax; j++) {
      let neighbours = 0;
      possibilities.forEach(([x,y]) => {
        let nextX = i + x;
        let nextY = j + y;
        if (nextX >=0 && nextX < xMax && nextY >= 0 && nextY < yMax) {
          neighbours += universeArr[nextX][nextY]
        }
      });
      
      if (neighbours < 2 || neighbours > 3) {
        nextUnivArrRow.push(0);
      } else if (neighbours === 3) {
        nextUnivArrRow.push(1);
      } else if (neighbours === 2 && universeArr[i][j] === 1) {
        nextUnivArrRow.push(1);
      } else {
        nextUnivArrRow.push(0);
      }
    }
    nextUnivArr.push(nextUnivArrRow);
  }
  universeArr = nextUnivArr;
  // return nextUnivArr;
};

function makeUnivStr() {

  // function that draws top & bottom fences
  function drawFence(array) {

    let fenceRow = '';

    fenceRow += '+';
    for (i in array) {
      fenceRow += '-'
    }

    fenceRow += '+'

    return fenceRow
  }

  // function that draws row (except top & bottom)
  function drawUniverseRow(array) {

    universeRow = '';

    universeRow += '|'
    for (value of array) {
      if (value == 0) {
        universeRow += ' '
      } else {
        universeRow += '*'
      }
    }
    universeRow += '|'

    return universeRow
  }

  // drawing process begins
  let tempStrUniv = ''
  tempStrUniv += drawFence(universeArr[0]) + '\n'
  for (array of universeArr) {
    tempStrUniv += drawUniverseRow(array) + '\n'
  }
  tempStrUniv += drawFence(universeArr[0]) + '\n'

  universeStr = tempStrUniv
};

function changeNewUniv() {
  document.getElementById('universe-canvas').innerHTML = "<p>" + universeStr + "</p>"
};


