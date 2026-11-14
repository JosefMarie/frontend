import React from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

// 1. CREATE: Define a "Slice" (Reducer + Actions) and the Store
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; }
  }
});

export const { increment, decrement } = counterSlice.actions;
export const reduxStore = configureStore({
  reducer: { counter: counterSlice.reducer }
});

// 2. PROVIDE: Done in App.js using <Provider>

// 3. CONSUME: Use selectors to read, dispatch to write
export const ReduxCounter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="state-card card-redux">
      <h3 className="card-title">Redux Toolkit</h3>
      <p className="card-count">{count}</p>
      <button onClick={() => dispatch(increment())} className="btn-action">➕</button>
      <button onClick={() => dispatch(decrement())} className="btn-action">➖</button>
    </div>
  );
};