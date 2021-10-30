export default function simplePathFinderMain(matrixClone, start, end, cb, speedBase) {
  const adjList = convertToAdj(matrixClone);
  const path = simplePathFinder(adjList, start, end, cb, speedBase);
  return path;
}

function simplePathFinder(adjList, start, end, cb, speedBase) {
  const queue = [[start]];
  const visited = new Set();
  let speedCounter = 1;

  visited.add(`${start[0]},${start[1]}`);

  while (queue.length) {
    const path = queue.shift();
    const currEnd = path[path.length - 1];

    cb(currEnd[0], currEnd[1], speedCounter * speedBase);
    speedCounter++;

    if (JSON.stringify(currEnd) === JSON.stringify(end)) {
      // this is MESSY 
      setTimeout(() => {
        // maybe make the path have time between each node,
        // so it doesn't just appear
        let counter = 1;
        path.forEach(node => {
          setTimeout(() => {
            const coord = `${node[0]},${node[1]}`;
            document.getElementById(coord)
              .style
              .backgroundColor = "blue";
          }, counter * 10);
          counter++;
        });
      }, speedCounter * speedBase);

      return path;
    }

    adjList[`${currEnd[0]},${currEnd[1]}`].forEach(adj => {
      if (!visited.has(`${adj[0]},${adj[1]}`)) {
        const tmp = [...path];
        tmp.push(adj);
        queue.push(tmp);
        visited.add(`${adj[0]},${adj[1]}`);
      }
    });
  }

  return false;
};

function convertToAdj(matrix) {
  const adjList = {};

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const coords = `${i},${j}`;
      const currNeighbors = getNeighbors(matrix, i, j);

      adjList[coords] = currNeighbors;
    }
  }

  return adjList;
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

// TODO: we have the "neighbors" in an adj list.. do we really need that extra step?
