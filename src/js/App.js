import React, { useEffect } from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';

// routes
import { Home } from './routes/Home';
import { Settings } from './routes/Settings';

// navigation
import { Nav } from './components/Nav';

// fontawesome
import './plugins/fontawesome';

const defaultSettings = {
  time: 40000, // get the time defaultSettings
  restTime: 20000 // get the interval setting
};

export function App() {
  useEffect(() => {
    window.localStorage.setItem(
      'MAIN_TIMER_SETTINGS',
      JSON.stringify(defaultSettings)
    );
  });
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
