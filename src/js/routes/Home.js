import React, { useState } from 'react';

// components
import ShowIntervals from '../components/ShowIntervals';
import ShowTime from '../components/ShowTime';

export function Home() {
  const [isStarted, setStartTimer] = useState(false);
  return (
    <div>
      <h1>Im home</h1>
      <ShowIntervals />
      <button onClick={() => setStartTimer(!isStarted)}>
        {isStarted ? 'Pause' : 'Play'}
      </button>
      <ShowTime />
    </div>
  );
}
