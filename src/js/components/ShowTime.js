import React from 'react';

export default function ShowTime({ time }) {
  // format time
  function formatTime(number) {
    return number.toString().padStart(2, '0');
  }
  function getMinutes() {
    return time.minutes;
  }
  function getSeconds() {
    return time.seconds;
  }
  if (time.minutes === undefined || time.seconds === undefined) {
    return null;
  }
  return (
    <span>
      {time.minutes && getMinutes()} : {time.seconds && getSeconds()}
    </span>
  );
}
