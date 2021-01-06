import React, { useState, useEffect } from 'react';

// components
import ShowIntervals from '../components/ShowIntervals';
import ShowTime from '../components/ShowTime';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Home() {
  const mmToMs = (mins) => {
    return +mins * 60 * 1000;
  };
  // TODO: save to localstore
  const setting = {
    time: mmToMs(1), // get the time settings
    interval: mmToMs(5) // get the interval setting
  };

  // start time
  const [isStarted, setStart] = useState(false);
  const [startTime, setStartTime] = useState(0);

  // start the timer
  useEffect(() => {
    let id = null;
    if (isStarted) {
      setStartTime(setting.time + Date.now());
      id = setInterval(() => setTimeleft(calculateTimeLeft()), 1000);
    }
  }, [isStarted]);

  // calculate time left
  const calculateTimeLeft = () => {
    let currentTime = Date.now();
    const endTime = startTime;
    const difference = currentTime - endTime;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 60 / 1000) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  // initialize time state
  const [timeLeft, setTimeleft] = useState(calculateTimeLeft());

  // setTimeout
  // press start

  // loop untill paused
  //    start timer
  //    start pause timer

  return (
    <div>
      <h1>Im home</h1>
      <ShowIntervals />
      <button onClick={() => setStart(!isStarted)}>
        <FontAwesomeIcon icon={['fas', isStarted ? 'pause' : 'play']} />
      </button>
      {/* display clock */}
      <ShowTime time={timeLeft} />
      {console.log(timeLeft)}
    </div>
  );
}
