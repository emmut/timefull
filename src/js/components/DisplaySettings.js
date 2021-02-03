import React, { useContext } from 'react';
import styled from 'styled-components';

import { msToMm, handleFirstPayload } from '../lib/helpers';
import { GlobalSettings } from '../lib/GlobalSettings';

const StyledSettings = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export function DisplaySettings() {
  const settings = handleFirstPayload(useContext(GlobalSettings));
  return (
    <StyledSettings>
      <span className="text-large">
        {settings.workTime && msToMm(settings.workTime)}
      </span>
      <span className="text-large">&#183;</span>
      <span className="text-large">
        {settings.restTime && msToMm(settings.restTime)}
      </span>
    </StyledSettings>
  );
}
