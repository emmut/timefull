import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { GlobalSettings } from '../lib/GlobalSettings';

// components
import { TheTime } from '../components/TheTime';
import { DisplaySettings } from '../components/DisplaySettings';
// helpers
import { handleFirstPayload } from '../lib/helpers';
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

const StyledDisplaySettings = styled(DisplaySettings)`
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translate(-50%);
`;
export function Home({
  settings,
  time,
  setTime,
  timerId,
  setTimerId,
  isStarted,
  setStart,
  toggleTimer,
  nextLap,
  resetLap
}) {
  return (
    <Timer>
      <Wrapper>
        <StyledDisplaySettings settings={settings} className="settings" />
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
