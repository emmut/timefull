import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';

// routes
import { Home } from './routes/Home';
import { Settings } from './routes/Settings';

// navigation
import { Nav } from './components/Nav';

// fontawesome
import './plugins/fontawesome';

// helpers
import { isObjEmpty, localSetting } from './lib/helpers';

//
const defaultSettings = {
  time: 5000, // time default setting
  restTime: 20000 // rest time default setting
};

// Local storeage access key
const ACC_KEY = 'MAIN_TIMER_SETTINGS';

export function App() {
  useEffect(() => {
    const prevSetting = localSetting.get(ACC_KEY) || {};
    if (isObjEmpty(prevSetting)) {
      localSetting.set(ACC_KEY, defaultSettings);
    }
  }, []);

  console.log(process);

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
