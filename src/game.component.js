import React from 'react';
import Board from './board.component';

///Game class. It hosts the State component.
export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                stepNumber: "",
                location: "",
                squareNum: "",
            }],
            currentStepNumber: 0,
            xIsNext: true,
            squareNum: "", 
            isReversed: false,
        };
    }

    //Function handling user clicks.
    handleClick(i) {

        const history = this.state.history.slice(0, this.state.currentStepNumber + 1);

        const location = [
            'row 1, col 1', 'row 1, col 2', 'row 1, col 3',
            'row 2, col 1', 'row 2, col 2', 'row 2, col 3',
            'row 3, col 1', 'row 3, col 2', 'row 3, col 3',
        ];

        const current = history[history.length - 1];
        const squares = current.squares.slice();
 
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                stepNumber: history.length,
                squares: squares,
                location: location[i],
            }]),
            currentStepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            squareNum: i,
        });
        console.log(squares[i] + ' clicked on Square # ' + i);      //Debug
    }

    jumpTo(step) {
        this.setState({
            currentStepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    reverseButtons() {
        this.setState({
          isReversed: !this.state.isReversed,
        });
      }

    //Rendering Game component
    render() {
        console.log('game rendered');
        const history = this.state.history; 

        const current = history[this.state.currentStepNumber];

        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = step.stepNumber ?
                'Go to move #' + step.stepNumber + ' in ' + step.location :
                'Go to game start';
            return (
                <li key={move}>
                    <button
                        className="button"
                        onClick={() => this.jumpTo(move)}
                    >{desc}</button>
                </li>
            );
        });

        let status;

        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        squareNum={this.state.squareNum}
                    />
                </div>
                <div className="game-info">
                    <button className="button" onClick={() => this.reverseButtons()}>Reverse</button>
                    <hr></hr>
                    <div>{status}</div>
                    <hr></hr>
                    <ol className={this.state.isReversed ? "reversed" : ""}>{moves}</ol>
                </div>
            </div>
        );
    }
}

//Function created to calculate the winner of the game
function calculateWinner(squares) {
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}