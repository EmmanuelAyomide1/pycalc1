let moves;
let available;

export function AiMove(Gmoves, Gavailable) {
    moves = Gmoves;
    const availableMoves = avail();
    let high = -Infinity
    let bestMove = 1
    let possibleMoves = []

    availableMoves.forEach(i => {
        let r;
        inp(moves, i - 1, false)
        if (getWinner()) {
            r = reward(false, 0)
        } else {
            r = minimax(avail(), true, 1)
        }
        console.log("rr", r)
        possibleMoves.push(r)
        if (r > high) {
            high = r
            bestMove = i
        }
        moves[i - 1] = i
    });
    return bestMove


    function getWinner() {
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
        if (!avail().length) {
            return 'Draw';
        }
        return null;
    }

    function reward(depth) {
        console.log('reward', getWinner())
        switch (getWinner()) {
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

    function minimax(availableMoves, state, depth) {
        let result = [];
        console.log("available moves: " + availableMoves)
        console.log(result);
        availableMoves.forEach(i => {
            inp(moves, i - 1, state)
            if (getWinner()) {
                if (state) {
                    let r = reward(state, depth);
                    result.push(r);
                } else {
                    let r = reward(state, depth);
                    result.push(r);
                }
            } else {
                result.push(minimax(availableMoves.filter(m => m !== i), !state, depth + 1));
            }
            moves[i - 1] = i
        });
        console.log("moves", moves);
        if (state) {
            return Math.min(result)
        } else {
            return Math.max(result)
        }
    }

    function inp(moves, i, isX) {
        if (isX) {
            moves[i] = 'X';
        }
        else {
            moves[i] = 'O';
        }
    }

    function avail() {
        return moves.filter((move) =>
            (move !== 'X' && move !== 'O')
        )
    }
}
