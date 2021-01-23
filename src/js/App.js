import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

// routes
import { Home } from './routes/Home';
import { Settings } from './routes/Settings';

// navigation
import { Nav } from './components/Nav';

// fontawesome
import './plugins/fontawesome';

// helpers
import { isObjEmpty, localSetting, shadeColor } from './lib/helpers';

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Nunito:300,400,700', 'sans-serif']
  }
});

// default
const defaultSettings = {
  isDefault: true,
  workTime: 2000, // time default setting
  restTime: 5000, // rest time default setting
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

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
`;

export function App() {
  useEffect(
    () =>
      localSetting.get(ACC_KEY).then((value) => {
        if (isObjEmpty(value)) {
          localSetting.set(ACC_KEY, defaultSettings);
        }
      }),
    []
  );

  return (
    <Router>
      <Wrapper>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Nav />
      </Wrapper>
    </Router>
  );
}
