import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// components
import { FormColorInput } from '../components/FormColorInput';
import { FormNumberInput } from '../components/FormNumberInput';

import { localSetting } from '../lib/helpers';

const StyledForm = styled.form`
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
`;

export function Settings({
  settings: prevSettings,
  setSettings,
  toggleTimer,
  timerId
}) {
  const [formSettings, setFormSetting] = useState(prevSettings);

  // handle saving value when changing input value
  useEffect(() => {
    // save to local
    localSetting.set(formSettings);

    // updates current state
    setSettings(formSettings);
  }, [formSettings]);

  // pause timer if its running
  useEffect(() => {
    if (typeof timerId === 'undefined') {
      return;
    }
    toggleTimer();
  }, []);

  return (
    <StyledForm className="SettingsForm">
      <FormNumberInput
        name="workTime"
        label="Timer length"
        value={formSettings.workTime}
        setFormSetting={setFormSetting}
      />
      <FormNumberInput
        name="restTime"
        label="Rest length"
        value={formSettings.restTime}
        setFormSetting={setFormSetting}
      />
      <FormColorInput
        name="primary"
        label="Color while working"
        value={formSettings.colors.primary.light}
        setFormSetting={setFormSetting}
      />
      <FormColorInput
        name="secondary"
        label="Color while resting"
        value={formSettings.colors.secondary.light}
        setFormSetting={setFormSetting}
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
    </StyledForm>
  );
}
