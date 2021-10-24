export default function traverseMatrix(startCol, startRow, matrixClone, cb, speedBase = 10) {
  const startNode = [startCol, startRow];
  const queue = [];
  const visited = new Set();
  let speedCounter = 1;

  // populate stack and visited with starting coords
  queue.push(startNode);
  visited.add(`${startCol},${startRow}`); // '0,1' '10,1'

  while (queue.length) {
    // grab current node
    const currNode = queue.shift();

    // call cb on the yx of currnode to do whatever with
    cb(currNode[0], currNode[1], speedCounter * speedBase);
    speedCounter++;

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
}

function getNeighbors(matrix, col, row) {
  const res = [];

  if (row + 1 < matrix[col].length &&
    matrix[col][row + 1] == 'x') res.push([col, row + 1]);

  if (row - 1 >= 0 &&
    matrix[col][row - 1] == 'x') res.push([col, row - 1]);

  if (col + 1 < matrix.length &&
    matrix[col + 1][row] == 'x') res.push([col + 1, row]);

  if (col - 1 >= 0 &&
    matrix[col - 1][row] == 'x') res.push([col - 1, row]);

  return res;
}
