import React from 'react';
import styled from 'styled-components';

const Time = styled.div`
  position: absolute;
  bottom: -4rem;
  left: 50%;
  transform: translate(-50%);
`;

export default function ShowTime({ time, isStarted }) {
  // format time
  function formatTime(number) {
    return number.toString().padStart(2, '0');
  }
  function getMinutes() {
    console.log(time.minutes);
    return formatTime(time.minutes);
  }
  function getSeconds() {
    return formatTime(time.seconds);
  }
  if (time.minutes === undefined || time.seconds === undefined) {
    return null;
  }
  if (!isStarted) {
    return null;
  }
  return (
    <Time className="text-large">
      {getMinutes()} : {getSeconds()}
    </Time>
  );
}
