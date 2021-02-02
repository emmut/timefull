import React from 'react';

export function DisplaySettings({ settings }) {
  return (
    <>
      <span className="text-large">
        {settings.time && msToMm(settings.time)}
      </span>
      <span className="text-large">/</span>
      <span className="text-large">
        {settings.time && msToMm(settings.restTime)}
      </span>
    </>
  );
}
