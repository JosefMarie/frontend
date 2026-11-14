import React from 'react';
import { create } from 'zustand';

// 1. CREATE: Define the store and actions in one simple hook
export const useZustandStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// 2. PROVIDE: (Zustand does not require a Provider wrapper!)

// 3. CONSUME: Use the hook directly in any component
export const ZustandCounter = () => {
  const { count, increment, decrement } = useZustandStore();
  return (
    <div className="state-card card-zustand">
      <h3 className="card-title">Zustand Store</h3>
      <p className="card-count">{count}</p>
      <button onClick={increment} className="btn-action">➕</button>
      <button onClick={decrement} className="btn-action">➖</button>
    </div>
  );
};