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
import { isObjEmpty, localSetting, shadeColor } from './lib/helpers';

//
const defaultSettings = {
  time: 5000, // time default setting
  restTime: 20000, // rest time default setting
  colors: {
    primary: '#FBB02D',
    primaryDark: '',
    secondary: '#63C132',
    secondaryDark: ''
  }
};

// TODO: make prettier
defaultSettings.colors.primaryDark = shadeColor(
  defaultSettings.colors.primary,
  -15
);
defaultSettings.colors.secondaryDark = shadeColor(
  defaultSettings.colors.secondary,
  -15
);
// Local storeage access key
const ACC_KEY = 'MAIN_TIMER_SETTINGS';

export function App() {
  useEffect(() => {
    const prevSetting = localSetting.get(ACC_KEY) || {};
    if (isObjEmpty(prevSetting)) {
      localSetting.set(ACC_KEY, defaultSettings);
    }
  }, []);

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
