export default class Grid {
  constructor(ySize, xSize, selectedGrid) {
    this.ySize = ySize;
    this.xSize = xSize;
    this.selectedGrid = selectedGrid;
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
      newColEl.innerText = 'x'; //tmp content

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
}
