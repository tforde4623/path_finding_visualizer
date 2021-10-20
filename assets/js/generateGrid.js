export default function generateGrid (ySize, xSize) {
  // generate rows by ySize and cols by xSize
  const mainGrid = document.querySelector('#main__visualizer');

  for (let y = 0; y < ySize; y++) {
    // addings cols to main grid
    const newColEl = document.createElement('div');
    
    for (let x = 0; x < xSize; x++) {
      // adding rows to cols
      const newRowEl = document.createElement('div');
      newRowEl.setAttribute('id', `${y}${x}`);
      newColEl.appendChild(newRowEl);
    }

    // add that row, with added cols, to the grid
    mainGrid.appendChild(newColEl);
  }
};
