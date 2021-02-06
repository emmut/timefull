import React, { useState } from 'react';
import styled from 'styled-components';
import { BlockPicker } from 'react-color';
import { shadeColor } from '../lib/helpers';
import { defaultColorsPicker } from '../lib/defaults';

const StyledLabel = styled.label`
  display: flex;
`;
const StyledBox = styled.div`
  width: 2rem;
  height: 2rem;
  margin-left: 0.5rem;
  border: 0.15rem solid var(--color-text);
  border-radius: 0.5rem;
  background: ${(props) => props.color};
`;
const StyledBoxWrapper = styled.div`
  position: relative;
  display: inline-block;
`;
const StyledBlockPicker = styled.div`
  position: absolute;
  top: calc(100% + 1rem);
  left: 50%;
  transform: translate(-50%);
  z-index: 10;
`;
const StyledInvisibleToggleOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;
export function FormColorInput({ name, label, value, setFormSetting }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (color, e) => {
    // pauses the timer
    setFormSetting((prevSettings) => {
      return {
        ...prevSettings,
        colors: {
          ...prevSettings.colors,
          [name]: {
            ...prevSettings.colors[name],
            light: color.hex,
            dark: shadeColor(color.hex)
          }
        }
      };
    });
  };

  const ColorBox = ({ value }) => {
    return (
      <StyledBoxWrapper>
        <StyledBox
          onClick={() => setIsOpen(!isOpen)}
          className="FormColor__input"
          role="input"
          color={value}
        />
        {isOpen && (
          <StyledBlockPicker className="FormColor__picker">
            <BlockPicker
              colors={defaultColorsPicker}
              color={value}
              onChangeComplete={(color, e) => handleColorChange(color, e)}
            />
          </StyledBlockPicker>
        )}
      </StyledBoxWrapper>
    );
  };
  return (
    <>
      <StyledLabel className="FormColor" htmlFor={name}>
        {label}
        <ColorBox className="FormColor__color-input" value={value} ame={name} />
      </StyledLabel>
      {isOpen && (
        <StyledInvisibleToggleOverlay onClick={() => setIsOpen(!isOpen)} />
      )}
    </>
  );
}
