export default function traverseMatrix(startRow, startCol, matrixClone, cb, speedBase = 10, endRow, endCol) {
  const startNode = [startRow, startCol];
  const queue = [];
  const visited = new Set();
  let speedCounter = 1;

  // populate stack and visited with starting coords
  queue.push(startNode);
  visited.add(`${startRow},${startCol}`); // '0,1' '10,1'

  while (queue.length) {
    // grab current node
    const currNode = queue.shift();

    // call cb on the yx of currnode to do whatever with
    cb(currNode[0], currNode[1], speedCounter * speedBase);
    speedCounter++;

    if (currNode[0] == endRow && currNode[1] == endCol) {
      // change the end node to some other color if found (gross flashing yellow code)
      let blinker;
      setTimeout(() => {
        blinker = setInterval(() => {
          document.getElementById(`${currNode[0]},${currNode[1]}`)
            .style.backgroundColor = 'yellow';
          setTimeout(() => {
            document.getElementById(`${currNode[0]},${currNode[1]}`)
              .style.backgroundColor = 'limegreen';
          }, 100);
        }, 400);
      }, speedCounter * speedBase);

      // path is available, return speed so we can do something after last node is changed
      return { counter: speedCounter * speedBase, interval: blinker };
    }

    const neighbors = getNeighbors(matrixClone, currNode[0], currNode[1]);

    neighbors.forEach(neighbor => {
      // grab string version of neighbor for comparison
      const strNeighbor = `${neighbor[0]},${neighbor[1]}`;
      if (!visited.has(strNeighbor)) {
        visited.add(strNeighbor);
        queue.push(neighbor);
      }
    });
  }

  // if gets though all, return false
  return false;
}

function getNeighbors(matrix, row, col) {
  const res = [];

  if (col + 1 < matrix[row].length &&
    matrix[row][col + 1] == 'x') res.push([row, col + 1]);

  if (col - 1 >= 0 &&
    matrix[row][col - 1] == 'x') res.push([row, col - 1]);

  if (row + 1 < matrix.length &&
    matrix[row + 1][col] == 'x') res.push([row + 1, col]);

  if (row - 1 >= 0 &&
    matrix[row - 1][col] == 'x') res.push([row - 1, col]);

  return res;
}
