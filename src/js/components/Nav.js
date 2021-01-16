import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// Menu hamburger
import { Bars } from './Bars';
const Navigation = styled.nav`
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  background: #202030;
  right: 0;
  bottom: 0;
  border-radius: 100vh;
`;

const NavItems = styled.div`
  position: relative;
  top: 0;
`;
const Wrap = styled.div`
  position: absolute;
  bottom: 100%;
`;
const StyledLink = styled(NavLink)`
  display: inline-block;
`;

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navigation onClick={() => setIsOpen(!isOpen)}>
      {isOpen && (
        <NavItems>
          <Wrap>
            <StyledLink exact to="/">
              Home
            </StyledLink>
            <StyledLink exact to="/Settings">
              Settings
            </StyledLink>
          </Wrap>
        </NavItems>
      )}
      <Bars />
    </Navigation>
  );
}
