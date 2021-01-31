import React, { useState, useEffect } from 'react';
import { localSetting, ACC_KEY } from '../lib/helpers';

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
    const settings = await localSetting.get(ACC_KEY);
    setSettings(settings);
    debugger;
    console.log(JSON.stringify(settings));
  }, []);
  // add new setting
  useEffect(() => {}, [settings]);

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
