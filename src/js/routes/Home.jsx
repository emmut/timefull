import React from 'react';
import styled from 'styled-components';

// components
import { TheTime } from '../components/TheTime';
import { DisplaySettings } from '../components/DisplaySettings';
// font awesome
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const Timer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;
const Wrapper = styled.div`
  position: relative;
`;

const PlayBtn = styled.button`
  display: grid;
  place-items: center;
  color: var(--color-dark-to-neutral);
  background-color: var(--color-neutral-to-dark);
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

/**
 * Circles
 */
const small = {
  size: '25rem',
  zIndex: -1
};
const large = {
  size: '30rem',
  zIndex: -2
};
const Circle = styled.div`
  position: absolute;
  display: block;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100vh;
  background-color: ${(props) => props.background};
  z-index: ${(props) => (props.large ? large.zIndex : small.zIndex)};
  width: ${(props) => (props.large ? large.size : small.size)};
  height: ${(props) => (props.large ? large.size : small.size)};
`;

export function Home({
  settings,
  time,
  isStarted,
  toggleTimer,
  nextLap,
  resetLap,
  isWorkTimer
}) {
  return (
    <Timer>
      <Wrapper>
        <StyledDisplaySettings settings={settings} className="settings" />
        <PlayBtn onClick={() => toggleTimer()}>
          <Icon icon={['fas', isStarted ? 'pause' : 'play']} />
        </PlayBtn>
        <TheTime time={time} />
        <Circle
          background={
            isWorkTimer
              ? settings.colors.primary.light
              : settings.colors.secondary.light
          }
        />
        <Circle
          large
          background={
            isWorkTimer
              ? settings.colors.primary.dark
              : settings.colors.secondary.dark
          }
        />
        <button onClick={() => nextLap()}>
          <Icon icon={['fas', 'forward']} />
        </button>
        <button onClick={() => resetLap()}>
          <Icon icon={['fas', 'undo']} />
        </button>
      </Wrapper>
    </Timer>
  );
}
