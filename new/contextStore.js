import React, { createContext, useState, useContext } from 'react';

// 1. CREATE: Initialize the context
const CounterContext = createContext();

// 2. PROVIDE: Create a wrapper component to hold the state
export const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);

  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
};

// 3. CONSUME: Read the context data
export const ContextCounter = () => {
  const { count, increment, decrement } = useContext(CounterContext);
  return (
    <div className="state-card card-context">
      <h3 className="card-title">Context API</h3>
      <p className="card-count">{count}</p>
      <button onClick={increment} className="btn-action">➕</button>
      <button onClick={decrement} className="btn-action">➖</button>
    </div>
  );
};