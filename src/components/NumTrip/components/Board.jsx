import React from 'react';
import Numbox from './Numbox';

const Board = ({ board, updateCell, updatedCells, newNumbers, mainArray }) => {
    return board.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((cell, colIndex) => {
                const isUpdated = updatedCells.some(updated => updated.row === rowIndex && updated.col === colIndex);
                const isNewNumber = newNumbers.some(newNum => newNum.row === rowIndex && newNum.col === colIndex);
                return (
                    <Numbox
                        key={colIndex}
                        cell={cell}
                        updateCell={() => updateCell(rowIndex, colIndex)}
                        isUpdated={isUpdated}
                        isNewNumber={isNewNumber}
                        mainArray={mainArray}
                                    />
                );
            })}
        </div>
    ));
};

export default Board;
