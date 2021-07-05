import React from 'react';
import styled from 'styled-components';

const Time = styled.div`
  display: flex;
  position: absolute;
  bottom: -4rem;
  left: 50%;
  transform: translate(-50%);
  div {
    display: inline;
  }
`;

export function TheTime({ time }) {
  if (typeof time === 'undefined') {
    return null;
  }
  // format time
  function format(number) {
    return number.toString().padStart(2, '0');
  }

  // objectify incoming time
  function TheTime({ time }) {
    const units = {
      hh: Math.floor(time / 3600 / 1000),
      mm: Math.floor((time / 60 / 1000) % 60),
      ss: Math.floor((time / 1000) % 60)
    };
    return `${format(units.hh)}:${format(units.mm)}:${format(units.ss)}`;
  }

  return (
    <Time className="text-large font-mono font-light">
      <TheTime time={time} />
    </Time>
  );
}
