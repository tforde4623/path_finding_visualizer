import Grid from './Grid.js';
import dfsAlgo from './algorithms/dfs.js';

window.onload = function () {
  const getGrid = document.querySelector('#main__visualizer');
  let grid = Grid.init(getGrid);

  document.querySelector('#size_selector')
    .addEventListener('change', e => {
      const tarVal = e.target.value;
      grid = Grid.start(tarVal);
    });

  // WAIT FOR START BUTTON
  document.querySelector('#start_btn')
    .addEventListener('click', () => {
      grid.clearColor();
      dfsAlgo(5, 5, grid.makeMatrixClone(), grid.genMatrixItemIds, 10);
    });
};


/*
TODOS:
1. Refactor the gvars to just be drawn from selector (since it has a default)
and code div size into grid.. or calling of the grid, idk

2. fix resizing so it will automatically resize the sqaure size, and the grid
size, to fill its area...

2. REDO SIZING, MUCH MORE BOXES, MUCH HIGHER SPEED

4. Add ability to draw walls and then implement 0s and 1s into matrix clone to
be able to implement it into algorithms paths.

5. add descriptions for the algorithms? maybe?

5. Fix the buggy thing that happens if u keep pressing start, maybe prevent it? Idk.j
*/




