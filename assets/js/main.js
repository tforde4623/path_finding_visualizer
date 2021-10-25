import Grid from './Grid.js';
import bfsAlgo from './algorithms/bfs.js';

window.onload = function () {
  const getGrid = document.querySelector('#main__visualizer');
  let grid = Grid.init(getGrid);
  let matrix = grid.makeMatrixClone();
  let finishPoint;

  document.querySelector('#size_selector')
    .addEventListener('change', e => {
      const tarVal = e.target.value;
      grid = Grid.init(getGrid, tarVal);
      matrix = grid.makeMatrixClone();
    });

  // WAIT FOR START BUTTON
  document.querySelector('#start_btn')
    .addEventListener('click', () => {
      const speedVal = document.getElementById('speed_selector').value;

      grid.clearColorAlgo();
      finishPoint = bfsAlgo([0, 0], matrix, grid.genMatrixItemIds, speedVal, [15, 15]);
    });

  // logic for handling drawing of walls
  getGrid.addEventListener('mousedown', e => {
    logWalls(e);
    getGrid.addEventListener('mouseover', logWalls)
  });

  getGrid.addEventListener('mouseup', () => {
    getGrid.removeEventListener('mouseover', logWalls);
  });

  getGrid.addEventListener('mouseleave', () => {
    getGrid.removeEventListener('mouseover', logWalls);
  });

  // removing the walls (will persist kind of (need to fix the graph))
  document.getElementById('reset')
    .addEventListener('click', () => {
      grid.clearColorAlgo();
      grid.clearAllColors(matrix);
      clearInterval(finishPoint['interval']);
    });

  function logWalls(e) {
    try {
      const nodeCoords = e.target.id.split(',');
      const y = nodeCoords[0], x = nodeCoords[1];
      if (matrix[y][x]) {
        matrix[y][x] = 'o';
        e.target.style.backgroundColor = 'black';
      }
    } catch (e) {
      console.log("Something went wrong selecting node on mouse movements, I woudln't worry about it unless visual errors occur");
    }
  }
};

/*
TODOS:
!!! if you mouse off the div it will never get the mouseup listener

1. Refactor the gvars to just be drawn from selector (since it has a default)
and code div size into grid.. or calling of the grid, idk

2. fix resizing so it will automatically resize the sqaure size, and the grid
size, to fill its area...

2. REDO SIZING, MUCH MORE BOXES, MUCH HIGHER SPEED

4. Add ability to draw walls and then implement 0s and 1s into matrix clone to
be able to implement it into algorithms paths.

5. add descriptions for the algorithms? maybe?

6. Fix the buggy thing that happens if u keep pressing start, maybe prevent it? Idk.j

7. Make it so we can use new Grid() not grid.init...
*/




