import React from 'react';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

// 1. CREATE: Define a class and make its properties observable
class CounterStore {
  count = 0;
  constructor() {
    makeAutoObservable(this);
  }
  increment = () => { this.count += 1; }
  decrement = () => { this.count -= 1; }
}
export const mobxInstance = new CounterStore();

// 2. PROVIDE: (MobX instances can just be imported directly)

// 3. CONSUME: Wrap the component in `observer` so it tracks changes
export const MobxCounter = observer(() => {
  return (
    <div className="state-card card-mobx">
      <h3 className="card-title">MobX</h3>
      <p className="card-count">{mobxInstance.count}</p>
      <button onClick={mobxInstance.increment} className="btn-action">➕</button>
      <button onClick={mobxInstance.decrement} className="btn-action">➖</button>
    </div>
  );
});