import React from 'react';
import styled from 'styled-components';
import { shadeColor } from '../../lib/helpers';
import { ColorBox } from './ColorBox';

const StyledLabel = styled.label`
  display: flex;
`;

export function FormColorInput({ name, label, value, setFormSetting }) {
  const handleColorChange = (color, e) => {
    setFormSetting((prevSettings) => {
      return {
        ...prevSettings,
        colors: {
          ...prevSettings.colors,
          [name]: {
            ...prevSettings.colors[name],
            light: color.hex,
            dark: shadeColor(color.hex, -15)
          }
        }
      };
    });
  };

  return (
    <>
      <StyledLabel className="FormColor" htmlFor={name}>
        {label}
        <div>
          <ColorBox
            className="FormColor__color-input"
            value={value}
            name={name}
            handleColorChange={handleColorChange}
            setFormSettings={setFormSettings}
          />
        </div>
      </StyledLabel>
    </>
  );
}
