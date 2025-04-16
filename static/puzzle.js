let gridSize = 6;
let tiles = [];
let emptyIndex = 0;

const puzzle = document.getElementById('puzzle');
const sizeSelect = document.getElementById('size-select');

sizeSelect.addEventListener('change', () => {
    gridSize = parseInt(sizeSelect.value);
    startPuzzle();
});

function startPuzzle() {
    puzzle.innerHTML = '';
    tiles = [];
    emptyIndex = gridSize * gridSize - 1;

    const tileSize = 80;
    puzzle.style.gridTemplateColumns = `repeat(${gridSize}, ${tileSize}px)`;
    puzzle.style.gridTemplateRows = `repeat(${gridSize}, ${tileSize}px)`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.style.width = `${tileSize}px`;
        tile.style.height = `${tileSize}px`;

        tile.dataset.index = i;

        if (i === emptyIndex) {
            tile.classList.add('empty');
        } else {
            const x = i % gridSize;
            const y = Math.floor(i / gridSize);

            tile.style.backgroundImage = `url(${imagePath})`;
            tile.style.backgroundSize = `${gridSize * tileSize}px ${gridSize * tileSize}px`;
            tile.style.backgroundPosition = `-${x * tileSize}px -${y * tileSize}px`;
        }

        tile.addEventListener('click', () => handleTileClick(i));
        tiles.push(tile);
        puzzle.appendChild(tile);
    }

    shufflePuzzle();
}

function handleTileClick(index) {
    if (isAdjacent(index, emptyIndex)) {
        swapTiles(index, emptyIndex);
        emptyIndex = index;
    }
}

function isAdjacent(i1, i2) {
    const x1 = i1 % gridSize;
    const y1 = Math.floor(i1 / gridSize);
    const x2 = i2 % gridSize;
    const y2 = Math.floor(i2 / gridSize);
    return Math.abs(x1 - x2) + Math.abs(y1 - y2) === 1;
}

function swapTiles(i1, i2) {
    const tile1 = tiles[i1];
    const tile2 = tiles[i2];

    // Swap classes
    const tempClass = tile1.className;
    tile1.className = tile2.className;
    tile2.className = tempClass;

    // Swap background position
    const tempPosition = tile1.style.backgroundPosition;
    tile1.style.backgroundPosition = tile2.style.backgroundPosition;
    tile2.style.backgroundPosition = tempPosition;
}

function shufflePuzzle(moves = 200) {
    for (let i = 0; i < moves; i++) {
        const neighbors = getMovableNeighbors(emptyIndex);
        const randomIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
        swapTiles(randomIndex, emptyIndex);
        emptyIndex = randomIndex;
    }
}

function getMovableNeighbors(index) {
    const neighbors = [];

    const left = index % gridSize !== 0 ? index - 1 : null;
    const right = index % gridSize !== gridSize - 1 ? index + 1 : null;
    const up = index - gridSize >= 0 ? index - gridSize : null;
    const down = index + gridSize < gridSize * gridSize ? index + gridSize : null;

    [left, right, up, down].forEach(i => {
        if (i !== null && isAdjacent(index, i)) neighbors.push(i);
    });

    return neighbors;
}

startPuzzle();
