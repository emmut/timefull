import React from 'react';
import styled from 'styled-components';

// components
import { TheTime } from '../components/TheTime';
import { DisplaySettings } from '../components/DisplaySettings';
import { StyledShadow } from '../lib/styles';

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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
`;

const PlayBtn = styled.button`
  color: var(--color-dark-to-neutral);
  background-color: var(--color-neutral-to-dark);
  width: 17rem;
  height: 17rem;
  border-radius: 100vh;
  margin: 0.7rem 0;
  font-size: 7rem;
  ${StyledShadow}
`;

const StyledDisplaySettings = styled(DisplaySettings)`
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translate(-50%);
`;

const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-neutral);
  border-radius: 100vh;
  width: 3rem;
  height: 3rem;
  ${StyledShadow};
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 0 0 1rem;
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
          <Icon
            icon={['fas', isStarted ? 'pause' : 'play']}
            style={{ transform: isStarted ? '' : 'translateX(10px)' }}
          />
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
        <StyledButtons>
          <StyledButton onClick={() => nextLap()}>
            <Icon icon={['fas', 'forward']} />
          </StyledButton>
          <StyledButton onClick={() => resetLap()}>
            <Icon icon={['fas', 'undo']} />
          </StyledButton>
        </StyledButtons>
      </Wrapper>
    </Timer>
  );
}
