import React from 'react';

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
    <div>
      {getMinutes()} : {getSeconds()}
    </div>
  );
}
