import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  display: block;
`;

export function FormInput({ name, type, label, value, setFormSetting }) {
  // handel form input
  const handleChange = (e) => {
    setFormSetting((prevSettings) => {
      return {
        ...prevSettings,
        [e.target.name]: handleValue(e.target)
      };
    });
  };
  // handle value
  const handleValue = (target) => {
    if (type === 'checkbox') {
      return target.checked === true;
    }
    return target.value;
  };
  return (
    <label htmlFor={name}>
      {label}
      {type === 'checkbox' ? (
        <StyledInput
          type="checkbox"
          name={name}
          id={name}
          onChange={(e) => handleChange(e)}
          defaultChecked={value}
        />
      ) : (
        <StyledInput
          type={type ?? 'text'}
          name={name}
          id={name}
          onBlur={(e) => handleChange(e)}
          defaultValue={value}
        />
      )}
    </label>
  );
}
