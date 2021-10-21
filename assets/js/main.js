import Grid from './Grid.js';
import dfsAlgo from './algorithms/dfs.js';

window.onload = function () {
  const getGrid = document.querySelector('#main__visualizer');
  const mainGrid = new Grid(15, 15, getGrid);
  const generatedMatrixClone = mainGrid.makeMatrixClone();

  mainGrid.changeItemSize(30);
  dfsAlgo(0, 7, generatedMatrixClone, mainGrid.genMatrixItemIds);
};




