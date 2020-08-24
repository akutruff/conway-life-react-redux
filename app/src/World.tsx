import React from 'react';
import { Board } from './app/types';
import { Cell } from './Cell';

export function World(props: Board) {
  const cells: JSX.Element[][] = [];

  for (let y = 0; y < props.gridSize.y; y++) {
    const columns: JSX.Element[] = [];
    cells.push(columns);
    for (let x = 0; x < props.gridSize.x; x++) {
      columns.push((<Cell location={{ x, y }} status={props.cells[x][y]} gridSize={props.gridSize} />));
    }
  }

  return (
    <div className="World">
      {cells}
    </div>
  );
}
