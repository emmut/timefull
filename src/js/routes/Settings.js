import React, { useState, useEffect } from 'react';
import { localSetting } from '../lib/helpers';
// const ACC_KEY = 'MAIN_TIMER_SETTINGS';

export function Settings() {
  const [settings, setSettings] = useState(undefined);

  // handel form input
  // const handleChange = (e) => {
  //   setSetting((prevSetting) => {
  //     if (
  //       typeof prevSetting === 'object' &&
  //       !prevSetting.hasOwnProperty(e.target.name) &&
  //       !Number.isInteger(e.target.value)
  //     ) {
  //       return prevSetting;
  //     }
  //     prevSetting[e.target.name] = e.target.value;
  //     return prevSetting;
  //   });
  // };
  // set up setting state form local storage on mount

  useEffect(async () => {
    // get settins object form local storeage
    const settings = await localSetting.get(ACC_KEY);
    setSettings(settings);
  }, []);

  // add new setting
  useEffect(() => {
    console.log(settings);
  }, [settings]);

  return (
    <div>
      <label htmlFor="time">
        Timer length
        <input
          type="number"
          name="time"
          id="time"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="time">
        Timer length
        <input
          type="number"
          name="restTime"
          id="restTime"
          onChange={(e) => handleChange(e)}
        />
      </label>
    </div>
  );
}
