import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// components
import { TheTime } from '../components/TheTime';
// helpers
import {
  msToMm,
  calculateTimeLeft,
  localSetting,
  isObjEmpty
} from '../lib/helpers';
// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ACC_KEY = 'MAIN_TIMER_SETTINGS';

const Timer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;
const Wrapper = styled.div`
  position: relative;
`;

const PlayBtn = styled.div`
  display: grid;
  place-items: center;
  color: var(--color-neutral);
  background-color: var(--color-primary);
  width: 17rem;
  height: 17rem;
  border-radius: 100vh;
  margin-top: 0.7rem;
  font-size: 7rem;
`;

const DisplaySettings = styled.div`
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translate(-50%);
`;

export function Home() {
  // settings object
  const [settings, setSettings] = useState(undefined);

  // start timer flag
  const [isStarted, setStart] = useState(false);

  // time state in ms
  const [time, setTime] = useState(undefined);
  const [timerId, setTimerId] = useState(null);

  // timer type {work|rest}
  const [isWorkTimer, setWorkTimer] = useState(true);

  function updateTime() {
    setTime((prevTime) => {
      // is timer active?
      const isActive = prevTime - 1 > 0;
      if (isActive) {
        // subtract time
        return prevTime - 1000;
      } else {
        // the end
        setWorkTimer(!isWorkTimer);

        return undefined;
      }
    });
  }

  function turnOffTimer() {
    // clear timer
    clearInterval(timerId);
    // clear timer state
    setTimerId(undefined);
    setStart(false);
  }

  function toggleTimer() {
    // debugger;
    setTime(isWorkTimer ? settings.workTime : settings.restTime);

    setStart(!isStarted);

    if (timerId) {
      turnOffTimer();
      return;
    }

    setTimerId(setInterval(() => updateTime(), 1000));
  }

  // get settings
  useEffect(async () => {
    // get settins object form local storeage
    const settings = await localSetting.get(ACC_KEY);
    setSettings(settings);
  }, []);

  useEffect(() => {
    // the timer has reached the end
    if (typeof time === 'undefined') {
      turnOffTimer();
    }
  }, [time]);

  return (
    <Timer>
      <Wrapper>
        <DisplaySettings settings={settings} className="settings" />
        <PlayBtn onClick={() => toggleTimer()}>
          <FontAwesomeIcon icon={['fas', isStarted ? 'pause' : 'play']} />
        </PlayBtn>
        <TheTime time={time} isStarted={isStarted} />
      </Wrapper>
    </Timer>
  );
}