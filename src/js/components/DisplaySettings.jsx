import React from 'react';
import styled from 'styled-components';

import { msToMm } from '../lib/helpers';

const StyledSettings = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export function DisplaySettings({ settings }) {
  return (
    <StyledSettings>
      <span className="text-large font-mono">
        {settings.workTime && msToMm(settings.workTime)}
      </span>
      <span className="text-large font-mono">&#183;</span>
      <span className="text-large font-mono">
        {settings.restTime && msToMm(settings.restTime)}
      </span>
    </StyledSettings>
  );
}
