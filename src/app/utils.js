let Initialm ;
export function AiMove(Gmoves, Gavailable) {
    Initialm = [...Gmoves]; // Make a copy of Gmoves to prevent direct mutation
    const availableMoves = avail(Initialm);
    let high = -100;
    let bestMove = 1;
    let possibleMoves = [];

    availableMoves.forEach(i => {
        let r;
        const moves = inp([...Initialm], i - 1, false); 
        if (getWinner(moves)) {
            r = reward(moves,0);
        } else {
            r = minimax(moves,avail(moves), true, 1);
        }
        possibleMoves.push(r);
        if (r > high) {
            high = r;
            bestMove = i;
        }
        moves[i - 1] = i; 
    });

    return bestMove;

    function getWinner(moves) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
                return moves[a];
            }
        }
        if (!avail(moves).length) {
            return 'Draw';
        }
        return null;
    }

    function reward(moves,depth) {
        switch (getWinner(moves)) {
            case 'O':
                return 15 - depth;
            case 'X':
                return -15 + depth;
            case 'Draw':
                return 2;
            default:
                return 2;
        }
    }

    function minimax(moves,availableMoves, state, depth) {
        let result = [];
        availableMoves.forEach(i => {
            const newMoves = inp([...moves], i - 1, state); // Pass a copy of moves to avoid mutation
            if (getWinner(newMoves)) {
                let r = reward(newMoves,depth);
                result.push(r);
            } else {
                result.push(minimax(newMoves,avail(newMoves), !state, depth + 1));
            }
            moves[i - 1] = i; // Revert the move here (this is still needed for the loop)
        });
        if (state) {
            return Math.min(...result); // Spread the result to avoid an array of arrays
        } else {
            return Math.max(...result); // Spread the result to avoid an array of arrays
        }
    }

    function inp(moves, i, isX) {
        if (isX) {
            moves[i] = 'X';
        } else {
            moves[i] = 'O';
        }

        return moves;
    }

    function avail(moves) {
        return moves.filter((move) => move !== 'X' && move !== 'O');
    }
}
