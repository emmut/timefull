import React, { useState, useEffect } from 'react';

import { localSetting } from '../lib/helpers';

import { msToMm, mmToMs } from '../lib/helpers';

export function Settings({
  settings: prevSettings,
  setSettings,
  toggleTimer,
  timerId
}) {
  const [formSettings, setFormSetting] = useState(prevSettings);

  // handel form input
  const handleChange = (e) => {
    // pauses the timer
    setFormSetting((prevSettings) => {
      return {
        ...prevSettings,
        [e.target.name]: mmToMs(e.target.value)
      };
    });
  };

  // handle saving value when changing input value
  useEffect(() => {
    // save to local
    localSetting.set(formSettings);

    // updates current state
    setSettings(formSettings);
  }, [formSettings]);

  useEffect(() => {
    if (typeof timerId === 'undefined') {
      return;
    }
    toggleTimer();
  }, []);

  const FormInput = ({ name, label, type, value }) => {
    return (
      <label htmlFor={name}>
        {label}
        <input
          type={type}
          name={name}
          id={name}
          onBlur={(e) => handleChange(e)}
          defaultValue={msToMm(value)}
          // onChange={(e) => handleChange(e)}
          // value={value}
        />
      </label>
    );
  };

  return (
    <form>
      <FormInput
        name="workTime"
        label="Timer length"
        type="number"
        value={formSettings.workTime}
      />
      <FormInput
        name="restTime"
        label="Rest length"
        type="number"
        value={formSettings.restTime}
      />
      <FormInput
        name="primary"
        label="Primary Color"
        type="text"
        value={formSettings.restTime}
      />
      <FormInput
        name="secondary"
        label="Secondary Color"
        type="text"
        value={formSettings.restTime}
      />

      {/* <FormInput
        name="inFace"
        label="In your face mode"
        type="checkbox"
      /> */}
      {/* <FormSelect
        name="sound"
        label="Alert sound"
        value={formSettings.restTime}
      /> */}
    </form>
  );
}
