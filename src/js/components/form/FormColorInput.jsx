import React from 'react';
import styled from 'styled-components';
import { ColorBox } from './ColorBox';

const StyledLabel = styled.label`
  display: flex;
`;

export function FormColorInput({ name, label, value, setFormSettings }) {
  return (
    <>
      <StyledLabel className="FormColor" htmlFor={name}>
        {label}
        <div>
          <ColorBox
            className="FormColor__color-input"
            value={value}
            name={name}
            setFormSettings={setFormSettings}
          />
        </div>
      </StyledLabel>
    </>
  );
}
