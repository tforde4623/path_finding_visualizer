import Grid from './Grid.js';
import dfsAlgo from './algorithms/dfs.js';

const defaultSquareSize = 20;
const defaultDivX = 720, defaultDivY = 480;
const [yAmount, xAmount] = calculateItemNumber(defaultDivY, defaultDivX, defaultSquareSize);
let generatedMatrixClone;

window.onload = function () {
  const getGrid = document.querySelector('#main__visualizer');

  let mainGrid = start(getGrid, defaultSquareSize, yAmount, xAmount);

  document.querySelector('#size_selector')
    .addEventListener('change', e => {
      const tarVal = e.target.value;
      const [newY, newX] = calculateItemNumber(defaultDivY, defaultDivX, tarVal)

      start(getGrid, tarVal, newY, newX);
    });

  // WAIT FOR START BUTTON
  document.querySelector('#start_btn')
    .addEventListener('click', () => {
      mainGrid.clearColor();
      dfsAlgo(5, 5, generatedMatrixClone, mainGrid.genMatrixItemIds, 10);
    });
};


// fix dependencies of these helper functions
function calculateItemNumber(divSizeY, divSizeX, squareSize) {
  const ySize = divSizeY / squareSize;
  const xSize = divSizeX / squareSize;

  return [ySize, xSize];
}

function start(gridEl, squareSize, y, x) {
  const grid = new Grid(y, x, gridEl);
  grid.changeItemSize(squareSize);
  generatedMatrixClone = grid.makeMatrixClone();
  return grid;
}


/*
TODOS:
1. fix resizing so it will automatically resize the sqaure size, and the grid
size, to fill its area...

2. REDO SIZING, MUCH MORE BOXES, MUCH HIGHER SPEED

3. Add ability to draw walls and then implement 0s and 1s into matrix clone to
be able to implement it into algorithms paths.

4. add descriptions for the algorithms? maybe?

5. Fix the buggy thing that happens if u keep pressing start, maybe prevent it? Idk.j
*/




