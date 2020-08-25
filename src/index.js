import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Function that returns each button of the board
function Square(props) {
    const fontWeight = props.isSelected ? "bold" : "normal";
    return (
        <button
            className="square" style={{ fontWeight: `${fontWeight}` }}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

//Board Class. Host all the buttons.
class Board extends React.Component {

    // Call Square function and send Square Location to Game component.    
    renderSquare(i) {
        //Check if the Square rendered is the one selected
        let isSelected = false;
        if (i === this.props.squareNum)
            isSelected = true

            let arr = Array(3).fill(null);
            return arr.map(square => {
                return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                isSelected={isSelected}
            />
        )
    })
    }

    board = () => {
        let arr = Array(3).fill(null);
        return arr.map(square => {
            return (
                <div className="board-row">
                    {this.renderSquare(square)}
                </div>
            )
        })
    }

    //Board rendering
    render() {
        console.log('board rendered');  //debug
        return (
            this.board()
        );
    }
}

// return (
//     <div>
//         <div className="board-row">
//             {this.renderSquare(0)}
//             {this.renderSquare(1)}
//             {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//             {this.renderSquare(3)}
//             {this.renderSquare(4)}
//             {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//             {this.renderSquare(6)}
//             {this.renderSquare(7)}
//             {this.renderSquare(8)}
//         </div>
//     </div>


//Game class. It hosts the State component.
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{                                     //History Array stores Squares Arrays. Each Square Array is created when a button is clicked
                squares: Array(9).fill(null),               //Each Square array stores a history of the last move in the Game Board
            }],
            historyLocation: Array(9).fill(null),           //It stores the position of each move (row, col)
            stepNumber: 0,                                   //It indicates the number of current move.
            xIsNext: true,                                  //It helps to control alternating between X and O
            squareNum: "",                                  //Stores the square number clicked
        };
    }

    //Function handling user clicks.
    handleClick(i) {

        // Get the history state and store in a constant. 
        // If the user clicks in some button to go back to some previous point 
        // in time and then make a new move from that point, 
        // it throws away all the “future” history that would now become incorrect.
        const history = this.state.history.slice(0, this.state.stepNumber + 1);

        //Determine the location (row, col)
        let local = 0;

        if (i < 3)
            local = 'row 1';
        if (i > 2 && i < 6)
            local = 'row 2';
        if (i >= 6)
            local = 'row 3';

        if (i === 0 || i === 3 || i === 6)
            local += ' col 1';
        if (i === 1 || i === 4 || i === 7)
            local += ' col 2';
        if (i === 2 || i === 5 || i === 8)
            local += ' col 3';

        const historyLocation = this.state.historyLocation.slice(0);    //Get the last History Location State and copy to a constant        
        historyLocation[this.state.stepNumber] = local;                 //Copy Local variable to the History Location constant.

        const current = history[history.length - 1];                    //Get the last squares array inside the history array and store it in the current constant
        const squares = current.squares.slice();                        //Copy content from the current const (which is the last of the Squares history state) to squares const

        //Stop handling clicks if player win or the button is already filled
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        //Constant squares receive O or X, depending of the xIsNext state
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        //Set new state.
        //It gets Local History array (which has the previous version of the History State)
        //and concatenate it with Local Squares (which has the
        //current version of the clicked square). 
        //Therefore, History is updated with the last click on the last Square array.
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            historyLocation: historyLocation.slice(),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            squareNum: i,
        });
        console.log(squares[i] + ' clicked on Square # ' + i);      //Debug
    }
    //It defines the jumpTo method in Game to update that stepNumber. 
    //Also sets xIsNext to true if the number that we’re changing 
    //stepNumber to is even (Because X is always even)
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    //Rendering Game component
    render() {
        console.log('game rendered');
        const history = this.state.history;                 //Get the history state and store in a constant

        //Get the last squares array inside the history array and store it in the current constant.
        //StepNumber is used to get the Last Step. If user clicks to go back to some previous playing, 
        //Step number is updated inside HandleClick function to create a new step from that point.
        const current = history[this.state.stepNumber];

        const winner = calculateWinner(current.squares);    //Get the winner from the CalculareWinner function and store it in winner constant

        //It creates a button to go to Past moves. 
        //It does it by looping through Local History array and creating buttons according of the number of clicks.
        //REMEMBER: Each time that some button is clicked, it renderizes all the buttons again through the Looping.
        const moves = history.map((step, move) => {         //"Step" is used to let "move" show the number of the iteration inside the loop
            const desc = move ?
                'Go to move #' + move + ' in ' + this.state.historyLocation[move - 1] :
                'Go to game start';
            return (
                <li key={move}>
                    <button
                        onClick={() => this.jumpTo(move)}
                    >{desc}</button>
                </li>
            );
        });

        let status;
        //Check if there is a winner. If, yes, show the winner, else, show the next player.
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
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}



//React rendering
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

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