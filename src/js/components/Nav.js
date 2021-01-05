import React from 'react';
import { NavLink } from 'react-router-dom';

export function Nav() {
  return (
    <nav>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink exact to="/Settings">
        Settings
      </NavLink>
    </nav>
  );
}
