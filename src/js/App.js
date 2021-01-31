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
import { isObjEmpty, localSetting } from './lib/helpers';

// default settings
import { ACC_KEY, defaultSettings } from './lib/defaults';

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Nunito:300,400,700', 'sans-serif']
  }
});

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
`;

export function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(async () => {
    const setting = await localSetting.get(ACC_KEY);
    if (isObjEmpty(setting)) {
      localSetting.set(ACC_KEY, defaultSettings);
    }
    setLoaded(true);
  }, []);

  return (
    <>
      {loaded ? (
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
      ) : (
        <h1>Wait...</h1>
      )}
    </>
  );
}
