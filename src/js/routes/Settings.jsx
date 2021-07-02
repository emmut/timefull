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
  const [formSettings, setFormSetting] = useState(prevSettings);

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
        setFormSetting={setFormSetting}
      />
      <FormNumberInput
        name="restTime"
        label="Break length"
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
      <FormInput
        name="inFace"
        label="In your face mode"
        type="checkbox"
        value={formSettings.inFace}
        setFormSetting={setFormSetting}
      />
      {/* <FormSelect
        name="sound"
        label="Alert sound"
        value={formSettings.restTime}
      /> */}
    </StyledForm>
  );
}
