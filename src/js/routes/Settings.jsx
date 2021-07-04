import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// components
import { FormColorInput } from '../components/form/FormColorInput';
import { FormNumberInput } from '../components/form/FormNumberInput';
import { FormInput } from '../components/form/FormInput';

import { localSetting } from '../lib/helpers';

const StyledForm = styled.form`
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
`;

export function Settings({ settings: prevSettings, setSettings }) {
  const [formSettings, setFormSettings] = useState(prevSettings);

  // handle saving value when changing input value
  useEffect(() => {
    // save to local
    localSetting.set(formSettings);

    // updates current state
    setSettings(formSettings);
  }, [formSettings]);

  return (
    <StyledForm className="SettingsForm">
      <FormNumberInput
        name="workTime"
        label="Timer length"
        value={formSettings.workTime}
        setFormSettings={setFormSettings}
      />
      <FormNumberInput
        name="restTime"
        label="Break length"
        value={formSettings.restTime}
        setFormSettings={setFormSettings}
      />
      <FormColorInput
        name="primary"
        label="Color while working"
        value={formSettings.colors.primary.light}
        setFormSettings={setFormSettings}
      />
      <FormColorInput
        name="secondary"
        label="Color while resting"
        value={formSettings.colors.secondary.light}
        setFormSettings={setFormSettings}
      />
      <FormInput
        name="inFace"
        label="In your face mode"
        type="checkbox"
        value={formSettings.inFace}
        setFormSettings={setFormSettings}
      />
      <FormInput
        name="alertSound"
        label="Use alert sound"
        type="checkbox"
        value={formSettings.alertSound}
        setFormSettings={setFormSettings}
      />
      {/* <FormSelect
        name="sound"
        label="Alert sound"
        value={formSettings.restTime}
      /> */}
    </StyledForm>
  );
}
