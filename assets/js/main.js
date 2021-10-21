import Grid from './Grid.js';

window.onload = function () {
  const getGrid = document.querySelector('#main__visualizer');
  const mainGrid = new Grid(15, 15, getGrid);
  mainGrid.generateGrid();

  testAlgo(15, 15, 100);

  console.log(makeMatrixClone(15, 15));
};

// ids are '0, 0' => 'ymax-1, xmax-1'
function testAlgo (cols, rows, speed) {
  // make a matrix representation
  let timeCounter = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      doAfter(i, j, timeCounter * speed);
      timeCounter++;
    }
  }
}

function doAfter (i, j, speed) {
  setTimeout(() => {
    const tmpId = `${i},${j}`;
    const tmpEl = document.getElementById(tmpId);
    tmpEl.style.backgroundColor = "limegreen";
  }, speed);
}

function makeMatrixClone (cols, rows) {
  const matrix = [];

  for (let i = 0; i < cols; i++) {
    const tmpRow = [];

    for (let j = 0; j < rows; j++) {
      tmpRow.push('x');
    }

    matrix.push(tmpRow);
  }

  return matrix;
}
