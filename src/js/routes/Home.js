import React, { useState, useEffect } from 'react';

// components
import ShowTime from '../components/ShowTime';
// helpers
import { mmToMs, msToMm, calculateTimeLeft } from '../lib/helpers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Home() {
  // get options object
  const settings =
    JSON.parse(window.localStorage.getItem('MAIN_TIMER_SETTINGS')) || {};
  let futureTime = settings.time + Date.now();

  // start timer flag
  const [isStarted, setStart] = useState(false);
  // time state
  const [startTime, setStartTime] = useState(0);

  // initialize time state
  const [timeLeft, setTimeleft] = useState(calculateTimeLeft(startTime));

  // start the timer
  useEffect(() => {
    let timer = null;
    if (isStarted) {
      timer = setInterval(() => {
        return setTimeleft(calculateTimeLeft(startTime));
      }, 1000);
    }

    return () => clearInterval(timer);
  });

  return (
    <div>
      {/* <div className="settings">
        <span>{settings.time && msToMm(settings.time)}</span>/
        <span>{settings.time && msToMm(settings.restTime)}</span>
      </div> */}
      <button
        onClick={() => {
          setStart(!isStarted);
          setStartTime(futureTime);
        }}
      >
        <FontAwesomeIcon icon={['fas', isStarted ? 'pause' : 'play']} />
      </button>
      {/* display clock */}
      <ShowTime time={timeLeft} isStarted={isStarted} />
    </div>
  );
}
