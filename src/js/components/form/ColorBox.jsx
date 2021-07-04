import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { defaultColorsPicker } from '../../lib/defaults';
import { shadeColor } from '../../lib/helpers';
import { BlockPicker } from 'react-color';
import { usePopper } from 'react-popper';

const StyledBoxWrapper = styled.div`
  position: relative;
  display: inline-block;
  color: var(--color-neutral);
`;
const StyledBox = styled.button`
  width: 2rem;
  height: 2rem;
  margin-left: 0.5rem;
  border: 0.15rem solid var(--color-text);
  border-radius: 0.5rem;
  background: ${(props) => props.color};
`;

const StyledBlockPicker = styled.div`
  z-index: 10;
`;

const arrowCommon = css`
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
`;

const StyledArrow = styled.div`
  ${arrowCommon}
  visibility: hidden;
  background: #fff;

  &:before {
    ${arrowCommon}
    visibility: visible;
    content: '';
    transform: rotate(45deg);
    box-shadow: inherit;
  }

  [data-popper-placement^='top'] > & {
    bottom: -4px;
    box-shadow: rgba(1, 1, 1, 0.1) 0px 1px;
  }

  [data-popper-placement^='bottom'] > & {
    top: -4px;
    z-index: -10;
    box-shadow: rgba(1, 1, 1, 0.1) 0px -1px;
    background-color: currentColor; // from inline style
  }
`;

export function ColorBox({ value, name, setFormSettings, setColor }) {
  const node = useRef();
  const [open, setOpen] = useState(false);
  // popper
  const [reference, setReference] = useState(null);
  const [popper, setPopper] = useState(null);
  const [arrow, setArrow] = useState(null);
  const { styles, attributes } = usePopper(reference, popper, {
    modifiers: [
      {
        name: 'arrow',
        options: { element: arrow }
      },
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      }
    ]
  });

  const handleColorChange = (hex) => {
    setFormSettings((prevSettings) => {
      return {
        ...prevSettings,
        colors: {
          ...prevSettings.colors,
          [name]: {
            ...prevSettings.colors[name],
            light: hex,
            dark: shadeColor(hex, -15)
          }
        }
      };
    });
  };

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <StyledBoxWrapper ref={node}>
        <StyledBox
          onClick={() => setOpen(!open)}
          role="input"
          color={value}
          type="button"
          ref={setReference}
        />
        {open && (
          <StyledBlockPicker
            ref={setPopper}
            style={styles.popper}
            {...attributes.popper}
          >
            <BlockPicker
              colors={defaultColorsPicker}
              color={value}
              triangle="hide"
              onChangeComplete={(color) => handleColorChange(color.hex)}
            />
            <StyledArrow
              arrowColor={value}
              ref={setArrow}
              style={{ ...styles.arrow, color: value }}
            />
          </StyledBlockPicker>
        )}
      </StyledBoxWrapper>
    </>
  );
}
