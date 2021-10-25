export default function traverseMatrix(startNode, matrixClone, cb, speedBase = 10, endNode) {
  const [endRow, endCol] = endNode;
  const [startRow, startCol] = startNode;
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
      const blinker = setInterval(() => {
        document.getElementById(`${currNode[0]},${currNode[1]}`)
          .style.backgroundColor = 'blue';
        setTimeout(() => {
          document.getElementById(`${currNode[0]},${currNode[1]}`)
            .style.backgroundColor = 'magenta';
        }, 200);
      }, speedCounter * speedBase);

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
  return { counter: speedCounter * speedBase, status: false };
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
