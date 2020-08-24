import { LifeStatus, Board, Vector2 } from './types';
import { createReducer, AnyAction, createSelector } from '@reduxjs/toolkit';
//import { createReducer } from 'redux';
import { tickAction } from './actions';
import { CaseReducerActions } from '@reduxjs/toolkit';
import undoable from 'redux-undo';
//import {setAutoFreeze } from 'immer';
//setAutoFreeze(false);

// const boardSelector = (state : any) => state;

// const cellsSelector = createSelector(boardSelector, board => board.cells);

// const numberOfLiveCellsSelector = createSelector(boardSelector, board => board.cells);



//********** HERE:  Uncomment between these two versions: 
// createReducer
export const boardSimulator = createReducer(initialBoardState(), builder => {
  builder
    .addCase(tickAction, (state, action) => {
      return tickImmer(state);      
    })
    .addDefaultCase((state, action) => {
    });
});

// // standard Reducer
// export const boardSimulator = (state = initialBoardState(), action : AnyAction) => {
//   if (tickAction.match(action)) {
//     return tick(state);
//     //return tickFaster(state);
//   }
//   else {
//     return state;
//   }
// };

function tick(state: ReturnType<typeof initialBoardState>) {
  // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by overpopulation.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

  const gridSize = state.gridSize;
  //const newCells = Array.apply(null, Array<Array<LifeStatus>>(gridSize.x)).map(() => new Array<LifeStatus>(gridSize.y).fill(LifeStatus.EMTPY));
  const newCells : Array<Array<LifeStatus>> = new Array<Array<LifeStatus>>(gridSize.x);

  const cells = state.cells;
  let board = "";
  for (let x = 0; x < cells.length; x++) {
    newCells[x] = new Array<LifeStatus>(gridSize.y);
    for (let y = 0; y < cells[x].length; y++) {
      let numberOfAliveNeigbors = 0;

      if (getNeighbor(cells, gridSize, { x: x - 1, y: y - 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;
      if (getNeighbor(cells, gridSize, { x: x - 1, y: y - 0 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;
      if (getNeighbor(cells, gridSize, { x: x - 1, y: y + 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;

      if (getNeighbor(cells, gridSize, { x: x - 0, y: y - 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;
      if (getNeighbor(cells, gridSize, { x: x - 0, y: y + 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;

      if (getNeighbor(cells, gridSize, { x: x + 1, y: y - 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;
      if (getNeighbor(cells, gridSize, { x: x + 1, y: y - 0 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;
      if (getNeighbor(cells, gridSize, { x: x + 1, y: y + 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;

      if (cells[x][y] === LifeStatus.ALIVE) {
        newCells[x][y] = (numberOfAliveNeigbors === 2 || numberOfAliveNeigbors === 3) ? LifeStatus.ALIVE : LifeStatus.EMTPY;
      }
      else {
        newCells[x][y] = numberOfAliveNeigbors === 3 ? LifeStatus.ALIVE : LifeStatus.EMTPY;
      }
    }

  }
  return {
    gridSize,
    cells: newCells,
    generation: state.generation + 1
  };
}

function tickImmer(state: ReturnType<typeof initialBoardState>) {
  // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by overpopulation.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

  const gridSize = state.gridSize;
  //const newCells = Array.apply(null, Array<Array<LifeStatus>>(gridSize.x)).map(() => new Array<LifeStatus>(gridSize.y).fill(LifeStatus.EMTPY));
  const newCells : Array<Array<LifeStatus>> = new Array<Array<LifeStatus>>(gridSize.x);

  const cells = state.cells;
  let board = "";
  for (let x = 0; x < cells.length; x++) {
    newCells[x] = new Array<LifeStatus>(gridSize.y);
    for (let y = 0; y < cells[x].length; y++) {
      let numberOfAliveNeigbors = 0;

      if (getNeighbor(cells, gridSize, { x: x - 1, y: y - 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;
      if (getNeighbor(cells, gridSize, { x: x - 1, y: y - 0 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;
      if (getNeighbor(cells, gridSize, { x: x - 1, y: y + 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;

      if (getNeighbor(cells, gridSize, { x: x - 0, y: y - 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;
      if (getNeighbor(cells, gridSize, { x: x - 0, y: y + 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;

      if (getNeighbor(cells, gridSize, { x: x + 1, y: y - 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;
      if (getNeighbor(cells, gridSize, { x: x + 1, y: y - 0 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;
      if (getNeighbor(cells, gridSize, { x: x + 1, y: y + 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;

      if (cells[x][y] === LifeStatus.ALIVE) {
        newCells[x][y] = (numberOfAliveNeigbors === 2 || numberOfAliveNeigbors === 3) ? LifeStatus.ALIVE : LifeStatus.EMTPY;
      }
      else {
        newCells[x][y] = numberOfAliveNeigbors === 3 ? LifeStatus.ALIVE : LifeStatus.EMTPY;
      }
      if (state.generation <= 2)
        //board += cells[x][y] === LifeStatus.ALIVE ? 'X' : 'O';
        board += numberOfAliveNeigbors;
    }
  }

  state.cells = newCells;
  state.generation += 1;  
}

const cells0: Board['cells'] = initialBoardState().cells;
const cells1: Board['cells'] = initialBoardState().cells;
let currentCells = -1;

function tickFaster(state: ReturnType<typeof initialBoardState>) {
  // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by overpopulation.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

  const gridSize = state.gridSize;

  let newCells: Board['cells'];
  let cells: Board['cells'];

  if (currentCells === 0) {
    currentCells = 1;
    newCells = cells1!;
    cells = cells0!;
  }
  else {
    currentCells = 0;
    newCells = cells0!;
    cells = cells1!;
  }

  //const newCells = currentCells!;

  let board = "";
  for (let x = 0; x < cells.length; x++) {
    for (let y = 0; y < cells[x].length; y++) {
      let numberOfAliveNeigbors = 0;

      if (getNeighbor(cells, gridSize, { x: x - 1, y: y - 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;
      if (getNeighbor(cells, gridSize, { x: x - 1, y: y - 0 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;
      if (getNeighbor(cells, gridSize, { x: x - 1, y: y + 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;

      if (getNeighbor(cells, gridSize, { x: x - 0, y: y - 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;
      if (getNeighbor(cells, gridSize, { x: x - 0, y: y + 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;

      if (getNeighbor(cells, gridSize, { x: x + 1, y: y - 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;
      if (getNeighbor(cells, gridSize, { x: x + 1, y: y - 0 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;
      if (getNeighbor(cells, gridSize, { x: x + 1, y: y + 1 }) === LifeStatus.ALIVE)
        numberOfAliveNeigbors++;

      if (cells[x][y] === LifeStatus.ALIVE) {
        newCells[x][y] = (numberOfAliveNeigbors === 2 || numberOfAliveNeigbors === 3) ? LifeStatus.ALIVE : LifeStatus.EMTPY;
      }
      else {
        newCells[x][y] = numberOfAliveNeigbors === 3 ? LifeStatus.ALIVE : LifeStatus.EMTPY;
      }
      if (state.generation <= 2)
        //board += cells[x][y] === LifeStatus.ALIVE ? 'X' : 'O';
        board += numberOfAliveNeigbors;
    }

    // if (state.generation <= 2)
    //   board += "\n";
  }
  
  // if (state.generation <= 2)
  //   console.log(board);
  return {
    ...state,
    //cells: newCells,
    cells: newCells.map(arr => arr.slice()),
    generation: state.generation + 1
  };
}

export function initialBoardState(): Board {
  const gridSize = { x: 100, y: 100 };
  const cells = Array.apply(null, Array<Array<LifeStatus>>(gridSize.x)).map(() => new Array<LifeStatus>(gridSize.y).fill(LifeStatus.EMTPY));

  cells[10][10] = LifeStatus.ALIVE;
  cells[11][10] = LifeStatus.ALIVE;
  cells[9][11] = LifeStatus.ALIVE;
  cells[10][11] = LifeStatus.ALIVE;
  cells[10][12] = LifeStatus.ALIVE;

  return {
    generation: 0,
    gridSize: gridSize,
    cells,
  };
}

export function getNeighbor(cells: Array<Array<LifeStatus>>, size: Vector2, position: Vector2) {
  const wrapped = getWrappedPosition(position, size);
  return cells[wrapped.x][wrapped.y];
}

function getWrappedPosition(position: Vector2, size: Vector2) {
  return {
    x: position.x < 0 ? position.x + size.x : position.x % size.x,
    y: position.y < 0 ? position.y + size.y : position.y % size.y,
  };
}
