import React from 'react';
import Square from './square.component';

//Board Class. Host all the buttons.
export default class Board extends React.Component {

    // Call Square function and send Square Location to Game component.    
    renderSquare(i) {
        //Check if the Square rendered is the one selected
        let isSelected = false;
        if (i === this.props.squareNum)
            isSelected = true

        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                isSelected={isSelected}
                key={i}
            />
        )
    }

    // Function used to loop and create the Board.
    buildBoard() {
        let boardRows = [];
        let counter = 0;
        let row = 0;
        let col = 0;
        for (row = 0; row < 3; ++row) {
            let boardColumns = [];
            for (col = 0; col < 3; ++col) {
                boardColumns.push(this.renderSquare(counter++));
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