import React from 'react';
import { DeveloperForm } from './DeveloperForm';

export default function App() {
  return (
    // The background color of the whole page is handled here 
    // to match the dark theme of the DeveloperForm container
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', padding: '1rem' }}>
      <DeveloperForm />
    </div>
  );
}