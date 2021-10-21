import Grid from './Grid.js';
import dfsAlgo from './algorithms/dfs.js';

window.onload = function () {
  const getGrid = document.querySelector('#main__visualizer');
  const mainGrid = new Grid(15, 15, getGrid);
  const generatedMatrixClone = mainGrid.makeMatrixClone();

  mainGrid.changeItemSize(30);
  dfsAlgo(0, 0, generatedMatrixClone, mainGrid.genMatrixItemIds, 50);
};

/* 
TODOS:
1. fix resizing so it will automatically resize the sqaure size, and the grid size, to fill
its area...

2. add descriptions for the algorithms? maybe?
*/




