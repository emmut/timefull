import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Menu hamburger
import { Bars as SvgBars } from './Bars';
const Navigation = styled.nav`
  display: grid;
  place-items: center;
  position: absolute;
  right: 1.2rem;
  bottom: 1.4rem;
  cursor: pointer;
`;

const CircleBtn = styled.button`
  display: grid;
  place-items: center;
  color: var(--color-neutral);
  background-color: var(--color-primary);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100vh;
  margin-top: 0.7rem;
  position: relative;
  &::before {
    position: absolute;
    right: 100%;
    top: 50%;
    margin-right: 0.6rem;
    transform: translateY(-50%);
    color: var(--color-primary-dark);
  }
  &:hover {
    background-color: var(--color-primary-dark);
  }

  &:hover::before {
    content: '${(p) => p.navTitle}';
    color: var(--color-primary);
  }
`;

const NavItems = styled.div`
  position: relative;
  top: 0;
`;
const Wrap = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  transform: translateX(-50%);
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${(p) =>
    !p.open &&
    css`
      display: none;
    `}
`;

export function Nav({ turnOffTimer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Overlay onClick={() => setIsOpen(!isOpen)} open={isOpen} />
      <Navigation onClick={() => setIsOpen(!isOpen)}>
        {isOpen && (
          <NavItems>
            <Wrap>
              <NavLink exact to="/">
                <CircleBtn navTitle="Home">
                  <FontAwesomeIcon icon={['fas', 'play']} />
                </CircleBtn>
              </NavLink>
              <NavLink exact to="/Settings">
                <CircleBtn navTitle="Settings">
                  <FontAwesomeIcon icon={['fas', 'sliders-h']} />
                </CircleBtn>
              </NavLink>
            </Wrap>
          </NavItems>
        )}
        <CircleBtn>
          <SvgBars />
        </CircleBtn>
      </Navigation>
    </>
  );
}
