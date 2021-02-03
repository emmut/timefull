import React, { useState, useEffect, useContext } from 'react';

import { handleFirstPayload, localSetting } from '../lib/helpers';
import { GlobalSettings } from '../lib/GlobalSettings';

export function Settings({ settings: prevSettings, setSettings }) {
  // const prevSettings = handleFirstPayload(useContext(GlobalSettings));

  const [formSettings, setFormSetting] = useState(prevSettings);

  // handel form input
  const handleChange = (e) => {
    setFormSetting((prevSettings) => {
      return {
        ...prevSettings,
        [e.target.name]: e.target.value
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

  const FormInput = ({ name, label, type, value }) => {
    return (
      <label htmlFor={name}>
        {label}
        <input
          type={type}
          name={name}
          id={name}
          onBlur={(e) => handleChange(e)}
          defaultValue={value}
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
      {/* <FormInput
        name="primary"
        label="Primary Color"
        type="text"
        value={settings.colors.primary}
      />
      <FormInput
        name="secondary"
        label="Secondary Color"
        type="text"
        value={settings.colors.secondary}
      /> */}
    </form>
  );
}
