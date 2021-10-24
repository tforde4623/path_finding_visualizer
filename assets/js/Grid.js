export default class Grid {
  constructor(ySize, xSize, selectedGrid) {
    this.ySize = ySize;
    this.xSize = xSize;
    this.selectedGrid = selectedGrid;
    this.currTimeout = [];

    // gen grid (with given y & x to start)
    this.generateGrid();
  }

  static calculateItemNumber(divSizeY, divSizeX, squareSize) {
    const ySize = divSizeY / squareSize;
    const xSize = divSizeX / squareSize;

    return [ySize, xSize];
  }

  static init(gridEl, squareSize = 20) {
    const [y, x] = this.calculateItemNumber(480, 720, squareSize);
    const grid = new Grid(y, x, gridEl);

    grid.changeItemSize(squareSize);
    return grid;
  }

  generateGrid(y, x) {
    this.selectedGrid.innerHTML = '';
    const ySize = y ? y : this.ySize;
    const xSize = x ? x : this.xSize;

    let counterY = 0;
    let counterX = 0;
    for (let i = 0; i < ySize * xSize; i++) {
      const newColEl = document.createElement('div');
      newColEl.setAttribute('class', 'grid__item');

      // generate ids w/ counters
      let tmpId = `${counterY},${counterX}`;
      if (counterX < xSize - 1) counterX++;
      else {
        counterX = 0;
        counterY++;
      }

      // add that div with id to grid
      newColEl.setAttribute('id', tmpId);
      this.selectedGrid.appendChild(newColEl);
    }

    this.xSize = xSize;
    this.ySize = ySize;
    this.changeItemSize(20);
  }

  changeItemSize(pxs) {
    // grid items are square
    this.selectedGrid.style.gridTemplateRows = `repeat(${this.ySize}, ${pxs}px)`;
    this.selectedGrid.style.gridTemplateColumns = `repeat(${this.xSize}, ${pxs}px)`;
  }

  genMatrixItemIds = (i, j, speed) => {
    // needed id is "0,1" (ex. "0,10") i = 0, j = 10
    const tmpId = `${i},${j}`;
    const tmpEl = document.getElementById(tmpId);

    function timeout() {
      return new Promise((resolve, reject) => {
        try {
          const tmpTimeout = setTimeout(() => {
            tmpEl.style.backgroundColor = "limegreen";
          }, speed);
          resolve(tmpTimeout);
        } catch (e) {
          reject(e);
        }
      });
    }

    timeout().then(tmp => this.currTimeout.push(tmp));
  }

  // method for generating a usable matrix from grid dimensions
  makeMatrixClone() {
    const matrix = [];
    for (let i = 0; i < this.ySize; i++) {
      const tmpRow = [];
      for (let j = 0; j < this.xSize; j++) {
        tmpRow.push('x');
      }
      matrix.push(tmpRow);
    }
    return matrix;
  }

  clearColorAlgo() {
    const items = document.querySelectorAll('.grid__item');
    items.forEach(node => {
      if (node.style.backgroundColor !== 'black') {
        node.style.backgroundColor = 'white';
      }
    });

    if (this.currTimeout.length) {
      this.currTimeout.forEach(timeout => clearTimeout(timeout));
    }
  }

  clearAllColors(matrix) {
    const items = document.querySelectorAll('.grid__item');
    items.forEach(node => node.style.backgroundColor = 'white');

    // make the matrix full of x again..
    for (let row in matrix) {
      for (let col in matrix[row]) {
        if (matrix[row][col] !== 'x') matrix[row][col] = 'x';
      }
    }
  }
}
