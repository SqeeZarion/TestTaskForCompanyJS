const isValidGroup = (group) => {
    const set = new Set(group);
    return (
        set.size === 9 && // unique
        [...set].every((num) => num >= 1 && num <= 9) // range 1-9
    );
};

const hasZero = (board) => board.some((row) => row.includes(0));
const getColumn = (board, index) => board.map((row) => row[index]);

const getBlock = (board, blockRow, blockCol) => {
    const block = [];
    for (let r = blockRow * 3; r < blockRow * 3 + 3; r++) {
        for (let c = blockCol * 3; c < blockCol * 3 + 3; c++) {
            block.push(board[r][c]);
        }
    }
    return block;
};

function validSolution(board) {
    //check nulls
    if (hasZero(board)) return false;

    //check row
    for (let row of board) {
        if (!isValidGroup(row)) return false;
    }

    //check colum
    for (let col = 0; col < 9; col++) {
        const column = getColumn(board, col);
        if (!isValidGroup(column)) return false;
    }

    //check blocks 3x3
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const block = getBlock(board, r, c);
            if (!isValidGroup(block)) return false;
        }
    }

    return true;
}

console.log(validSolution([
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
])); // => true

console.log(validSolution([
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 0, 3, 4, 8],
    [1, 0, 0, 3, 4, 2, 5, 6, 0],
    [8, 5, 9, 7, 6, 1, 0, 2, 0],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 0, 1, 5, 3, 7, 2, 1, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 0, 0, 4, 8, 1, 1, 7, 9]
])); // => false
