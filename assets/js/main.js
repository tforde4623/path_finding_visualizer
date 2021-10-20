window.onload = function () {
  console.log('hello world')
  generateGrid(); 
};

function generateGrid (ySize, xSize) {
  // generate rows by ySize and cols by xSize
  const mainGrid = document.querySelector('#main__visualizer');
  mainGrid.setAttribute('style', 'background-color: red;')
};
