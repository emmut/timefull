import React, { useState } from 'react';

// components
import ShowIntervals from '../components/ShowIntervals';
import ShowTime from '../components/ShowTime';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Home() {
  const [isStarted, setStartTimer] = useState(false);
  return (
    <div>
      <h1>Im home</h1>
      <ShowIntervals />
      <button onClick={() => setStartTimer(!isStarted)}>
        <FontAwesomeIcon icon={['fas', isStarted ? 'pause' : 'play']} />
      </button>
      <ShowTime />
    </div>
  );
}
