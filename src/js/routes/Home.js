import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// components
import { TheTime } from '../components/TheTime';
// helpers
import { localSetting } from '../lib/helpers';
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
    setStart(!isStarted);

    if (timerId) {
      turnOffTimer();
      return;
    }
    setTimerId(setInterval(() => updateTime(), 1000));
  }

  // reset timer and set time to next lap
  function nextLap() {
    setWorkTimer(!isWorkTimer);

    turnOffTimer();
  }

  // reset current lap
  function resetLap() {
    setTime(isWorkTimer ? settings.workTime : settings.restTime);
  }
  // get settings
  useEffect(async () => {
    // get settins object form local storeage
    const settings = await localSetting.get(ACC_KEY);
    setSettings(settings);

    // initialize time state
    setTime(settings.workTime);
  }, []);

  useEffect(() => {
    // the timer has reached the end
    if (typeof time === 'undefined') {
      turnOffTimer();
    }
  }, [time]);

  useEffect(() => {
    // will be undefined on first render
    if (typeof settings === 'undefined') {
      return;
    }
    setTime(isWorkTimer ? settings.workTime : settings.restTime);
  }, [isWorkTimer]);

  return (
    <Timer>
      <Wrapper>
        <DisplaySettings settings={settings} className="settings" />
        <PlayBtn onClick={() => toggleTimer()}>
          <FontAwesomeIcon icon={['fas', isStarted ? 'pause' : 'play']} />
        </PlayBtn>
        <TheTime time={time} />
        <div onClick={() => nextLap()}>
          <FontAwesomeIcon icon={['fas', 'forward']} />
        </div>
        <div onClick={() => resetLap()}>
          <FontAwesomeIcon icon={['fas', 'undo']} />
        </div>
      </Wrapper>
    </Timer>
  );
}
