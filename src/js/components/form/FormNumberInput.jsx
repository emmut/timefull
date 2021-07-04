import React from 'react';
import styled from 'styled-components';

import { mmToMs, msToMm } from '../../lib/helpers';

const StyledInput = styled.input`
  margin-right: 0.5rem;
  border: 0.15rem solid var(--color-text);
  border-radius: 0.5rem;
  width: clamp(2);
  min-width: 3rem;
  height: 2.5rem;
`;

export const FormNumberInput = ({ name, label, value, setFormSettings }) => {
  // handel form input
  const handleChange = (e) => {
    // pauses the timer
    setFormSettings((prevSettings) => {
      return {
        ...prevSettings,
        [e.target.name]: mmToMs(e.target.value)
      };
    });
  };
  return (
    <label htmlFor={name}>
      {label}
      <StyledInput
        type="number"
        name={name}
        id={name}
        onBlur={(e) => handleChange(e)}
        defaultValue={msToMm(value)}
      />
    </label>
  );
};
