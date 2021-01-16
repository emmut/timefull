import React, { useState, useEffect } from 'react';

export function Settings({ setting: prevSetting }) {
  // const [setting, setSetting] = useState(defaultSettings);

  // handel form input
  const handleChange = (e) => {
    setSetting((prevSetting) => {
      if (
        typeof prevSetting === 'object' &&
        !prevSetting.hasOwnProperty(e.target.name) &&
        !Number.isInteger(e.target.value)
      ) {
        return prevSetting;
      }
      prevSetting[e.target.name] = e.target.value;
      return prevSetting;
    });
  };
  // set up setting state form local storage on mount
  // useEffect(() => {
  //   setSetting(prevSetting);
  // });
  // add new setting
  // useEffect(() => {
  //   window.localStorage.setItem(
  //     'MAIN_TIMER_SETTINGS',
  //     JSON.stringify(setting)
  //   ) || defaultSettings;
  // }, [setting]);

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
