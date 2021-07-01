import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { defaultColorsPicker } from '../lib/defaults';
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

const StyledArrow = styled.div`
  display: inline-block;
`;
export function ColorBox({ value, handleColorChange }) {
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
        options: [0, 0]
      }
    ]
  });

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
              onChangeComplete={(color, e) => handleColorChange(color, e)}
            />
            <StyledArrow ref={setArrow} style={styles.arrow}>
              <svg viewBox="0 0 10 10" width="10" height="10">
                <path fill="currentColor" d="M0 0 10 0 5 10 0 0"></path>
              </svg>
            </StyledArrow>
          </StyledBlockPicker>
        )}
      </StyledBoxWrapper>
    </>
  );
}
