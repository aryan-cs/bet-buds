import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import getEnvVars from '../../config';

const { firebaseConfig } = getEnvVars();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

//Load Data (should be a 2D Array)
const board = async (id) => {
    try {
        const docRef = doc(firestore, "events", "boards", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } 
        else {
            console.log('Event not found.');
            return null;
        }
    } 

    catch (error) {
        console.error('Error reading data:', error);
    }
}

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

var bingo = checkBingo(board);

export default bingo;

/*TEST----------------------------------------

const bingoBoard = [
    [true, true, true, true, true],
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, false, false, false],
    [true, true, true, true, true]
];

console.log(checkBingo(bingoBoard));*/