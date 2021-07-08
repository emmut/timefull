import React from 'react';
import styled from 'styled-components';

// components
import { TheTime } from '../components/TheTime';
import { DisplaySettings } from '../components/DisplaySettings';
import { StyledShadow } from '../lib/styles';
import { Morph } from '../components/Morph';
// font awesome
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import { paths } from '../lib/defaults';

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
  z-index: 10;
  ${StyledShadow}
`;

const StyledDisplaySettings = styled.div`
  z-index: 10;
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

const StyledMorph = styled.div`
  position: absolute;
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
        <StyledMorph>
          <Morph
            paths={paths.primary}
            color={
              isWorkTimer
                ? settings.colors.primary.light
                : settings.colors.secondary.light
            }
            delay={200}
            large
            isStarted={isStarted}
          />
        </StyledMorph>
        <StyledMorph>
          <Morph
            paths={paths.secondary}
            color={
              isWorkTimer
                ? settings.colors.primary.dark
                : settings.colors.secondary.dark
            }
            isStarted={isStarted}
          />
        </StyledMorph>
        <StyledDisplaySettings>
          <DisplaySettings settings={settings} className="settings" />
        </StyledDisplaySettings>
        <PlayBtn onClick={() => toggleTimer()}>
          <Icon
            icon={['fas', isStarted ? 'pause' : 'play']}
            style={{ transform: isStarted ? '' : 'translateX(10px)' }}
          />
        </PlayBtn>
        <TheTime time={time} />
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
