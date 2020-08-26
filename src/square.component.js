import React from 'react';

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

export default Square;