import React from 'react';
import './StateArena.css'; // <--- Import the CSS here
import { Provider as ReduxProvider } from 'react-redux';

import { ZustandCounter } from './zustandStore';
import { CounterProvider, ContextCounter } from './ContextStore';
import { reduxStore, ReduxCounter } from './reduxStore';
import { MobxCounter } from './mobxStore';

export default function App() {
  return (
    <div className="arena-container">
      <h1 className="arena-title">State Management Comparison</h1>
      
      <ReduxProvider store={reduxStore}>
        <CounterProvider>
          
          <div className="grid-container">
            <ZustandCounter />
            <ContextCounter />
            <ReduxCounter />
            <MobxCounter />
          </div>

        </CounterProvider>
      </ReduxProvider>
      
    </div>
  );
}