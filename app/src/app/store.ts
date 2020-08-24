import { Board, Vector2, LifeStatus } from './types';
import { boardSimulator } from './board';
import { configureStore, combineReducers, createReducer, createAction } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: boardSimulator,  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
