import React from 'react';
import Square from './square.component';

//Board Class. Child Component
export default class Board extends React.Component {

    //Function that checks conditions and return Square Components
    renderSquare(i) {
        //Check whether Square is Selected.
        let isSelected = false;
        if (i === this.props.squareNum)
            isSelected = true

        //Get Squares that won the game and check against the current rendering
        const getSquaresWon = this.props.winnerSquares !== null ? this.props.winnerSquares.slice() : "";        
        let squareWon;

        if (i === getSquaresWon[0] || i === getSquaresWon[1] || i === getSquaresWon[2])
            squareWon = true;
          
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                isSelected={isSelected}
                key={i}
                squareWon={squareWon}
            />
        )
    }

    // Function used to loop and create the Board.
    buildBoard() {
        let boardRows = [];
        let index = 0;
        let row = 0;
        let col = 0;
        for (row = 0; row < 3; ++row) {
            let boardColumns = [];
            for (col = 0; col < 3; ++col) {
                boardColumns.push(this.renderSquare(index++));
            }
            boardRows.push(<div className="board-row" key={row}>{boardColumns}</div>)
        }
        return boardRows;
    }

    //Board rendering
    render() {
        console.log('board rendered');  //debug
        return (
            this.buildBoard()
        );
    }
}