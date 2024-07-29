//Checking Algorithm
function checkBingo(board) {
    const size = 5;

    //Rows 
    for (var i = 0; i < size; i++) {
        var rowBingo = true;
        for (var j = 0; j < size; j++) {
            if (!board[i][j]) {
                rowBingo = false;
                break;
            }
        }
        if (rowBingo) return true;
    }

    //Columns
    for (var j = 0; j < size; j++) {
        var colBingo = true;
        for (var i = 0; i < size; i++) {
            if (!board[i][j]) {
                colBingo = false;
                break;
            }
        }
        if (colBingo) return true;
    }

    //One Diagonal
    var firstDiagBingo = true;
    for (var i = 0; i < size; i++) {
        if (!board[i][i]) {
            firstDiagBingo = false;
            break;
        }
    }
    if (firstDiagBingo) return true;

    //Other Diagonal
    var secondDiagBingo = true;
    for (var i = 0; i < size; i++) {
        if (!board[i][size - 1 - i]) {
            secondDiagBingo = false;
            break;
        }
    }
    if (secondDiagBingo) return true;

    return false;
}

checkBingo(board)

/*TEST----------------------------------------

const bingoBoard = [
    [true, true, true, true, true],
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, false, false, false],
    [true, true, true, true, true]
];

console.log(checkBingo(bingoBoard));*/