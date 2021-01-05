import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';

// routes
import { Home } from './routes/Home';
import { Settings } from './routes/Settings';

// navigation
import { Nav } from './components/Nav';

export function App() {
  return (
    <Router>
      <div>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </div>
      <Nav />
    </Router>
  );
}
