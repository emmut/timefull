import React, { useState, useEffect } from 'react';

// components
import ShowIntervals from '../components/ShowIntervals';
import ShowTime from '../components/ShowTime';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Home() {
  const mmToMs = (mins) => {
    return +mins * 60 * 1000;
  };
  const msToMm = (mins) => {
    return +mins / 60 / 1000;
  };
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

  // calculate time left
  function calculateTimeLeft(start) {
    let currentTime = Date.now();
    const difference = start - currentTime;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 60 / 1000) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }

  return (
    <div>
      <h1>Im home</h1>
      <div className="settings">
        <span>{settings.time && msToMm(settings.time)}</span>/
        <span>{settings.time && msToMm(settings.restTime)}</span>
      </div>
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
