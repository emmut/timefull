import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// components
import ShowTime from '../components/ShowTime';
// helpers
import { msToMm, calculateTimeLeft, localSetting } from '../lib/helpers';
// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  const settings = localSetting.get('MAIN_TIMER_SETTINGS');
  // get options object
  const futureTime = settings.time + Date.now();

  // start timer flag
  const [isStarted, setStart] = useState(false);
  // time state
  const [startTime, setStartTime] = useState(0);

  // initialize time state
  const [timeLeft, setTimeleft] = useState(
    calculateTimeLeft(startTime, setStart)
  );

  // start the timer
  useEffect(() => {
    let timer = null;
    if (isStarted) {
      timer = setInterval(() => {
        return setTimeleft(calculateTimeLeft(startTime, setStart));
      }, 1000);
    }

    return () => clearInterval(timer);
  });
  // useEffect(
  //   (isStarted) => {
  //     console.log(isStarted);
  //   },
  //   [isStarted]
  // );
  return (
    <Timer>
      <Wrapper>
        <DisplaySettings settings={settings} className="settings" />
        <PlayBtn
          onClick={() => {
            setStart(!isStarted);
            setStartTime(futureTime);
          }}
        >
          <FontAwesomeIcon icon={['fas', isStarted ? 'pause' : 'play']} />
        </PlayBtn>
        <ShowTime time={timeLeft} isStarted={isStarted} />
      </Wrapper>
    </Timer>
  );
}
