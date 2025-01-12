export function dijkstra(grid, startNode, finishNode) {
  // console.log("start");
  const visitedNodesInOrder = [];

  // console.log(startNode);
  // console.log(finishNode);

  // push all unvis nodes in unvisNodes variable
  const unvisitedNodes = getAllNodes(grid);
  startNode.distance = 0;

  // while univ nodes array is non-empty
  while (!!unvisitedNodes.length) {
    // console.log(unvisitedNodes.length);
    sortNodesByDistance(unvisitedNodes); //sort the array of unvis nodes
    const closestNode = unvisitedNodes.shift(); //get the first node from the sorted array
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true; // mark the curr node as vis
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) {
      // console.log("found");
      return visitedNodesInOrder;
    }
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

// function to sort the nodes depending upon their distance from the source node
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

// to update two properties for each neighbour
// 1-> distance, as node.distance + 1;
// 2-> its prev_node as node itself
function updateUnvisitedNeighbors(node, grid) {
  const univisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of univisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

// it will return array of all neighbours wrt current node
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node; //get index

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  // console.log(currentNode);
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
}
