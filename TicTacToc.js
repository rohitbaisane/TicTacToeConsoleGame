const prompt = require('prompt-sync')();

console.log('\nWelcome To the TicTacToe Game, We hope that you will enjoy this game.\n');
console.log('********************************************************************\n');

const boardSize = prompt("Enter the board size for your tictactoe game: ");

const TicTacToeBoard = new getTicTacToeBoard();
const board = new TicTacToeBoard(boardSize);

board.printBoard();

while (!board.isTheGameEnded()) {
    console.log(`Enter the position player ${board.getPlayer()}`);
    const x = parseInt(prompt());
    const y = parseInt(prompt());
    board.place(x, y);
    board.printBoard();
}

const winner = board.getWinner();
if (winner === 'No Winner') console.log("The game has ended in draw");
else console.log(`The game has ended, The winner is player ${winner}`);



function getTicTacToeBoard() {
    class TicTacToe {
        #board;
        #playerTurn;
        #winner;
        #movesPlayed;
        constructor(size) {
            this.#board = new Array(size);
            for (let i = 0; i < size; i++) {
                this.#board[i] = new Array(size);
                for (let j = 0; j < size; j++) {
                    this.#board[i][j] = '';
                }
            }
            this.#playerTurn = 1;
            this.#winner = 'No Winner';
            this.#movesPlayed = 0;
        }

        getWinner() {
            return this.#winner;
        }

        printBoard() {
            process.stdout.write('\n');
            const boardSize = this.#board.length;
            for (let i = 0; i < boardSize; i++) {
                for (let j = 0; j < boardSize; j++) {
                    process.stdout.write(`|__${this.#board[i][j] || '_'}__|`);
                }
                process.stdout.write('\n');
            }
            process.stdout.write('\n');
        }

        isTheGameEnded() {
            const boardSize = this.#board.length;
            if (this.#isAnyRowHasSameValue() || this.#isAnyColHasSameValue() || this.#isAnyDiagonalHasSameVaue()) {
                this.#winner = this.#playerTurn == 1 ? 2 : 1;
                return true;
            }
            if (this.#movesPlayed === this.#board.length * this.#board.length) {
                return true;
            }
        }

        #isAnyRowHasSameValue() {
            const boardSize = this.#board.length;
            for (let i = 0; i < boardSize; i++) {
                const firstCellValue = this.#board[i][0];
                let rowIsSame = true;
                for (let j = 0; j < boardSize; j++) {
                    if (firstCellValue === '' || firstCellValue !== this.#board[i][j]) {
                        rowIsSame = false;
                        break;
                    }
                }
                if (rowIsSame) return true;
            }
            return false;
        }

        #isAnyColHasSameValue() {
            const boardSize = this.#board.length;
            for (let i = 0; i < boardSize; i++) {
                const firstCellValue = this.#board[0][i];
                let colIsSame = true;
                for (let j = 0; j < boardSize; j++) {
                    if (firstCellValue === '' || firstCellValue !== this.#board[j][i]) {
                        colIsSame = false;
                        break;
                    }
                }
                if (colIsSame) return true;
            }
            return false;
        }

        #isAnyDiagonalHasSameVaue() {
            const boardSize = this.#board.length;
            let isDigSame = true, isRevDigSame = true;
            for (let i = 0; i < boardSize; i++) {
                if (this.#board[i][i] !== this.#board[0][0] || this.#board[0][0] === '') {
                    isDigSame = false;
                    break;
                }
            }
            for (let i = 0; i < boardSize; i++) {
                if (this.#board[i][boardSize - 1 - i] !== this.#board[0][2] || this.#board[0][2] === '') {
                    isRevDigSame = false;
                    break;
                }
            }
            if (isDigSame || isRevDigSame) return true;
            return false;
        }

        place(x, y) {
            this.#board[x][y] = this.#playerTurn == 1 ? 'X' : 'O';
            this.#playerTurn = this.#playerTurn == 1 ? 2 : 1;
            this.#movesPlayed++;
        }


        getPlayer() {
            return this.#playerTurn;
        }
    }

    return TicTacToe;
}