import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
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

// local storeage acces key
import { defaultSettings } from './lib/defaults';

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  padding: 4rem;
  box-sizing: border-box;
`;

export function App() {
  /**
   * App level state
   */
  const [settings, setSettings] = useState(undefined);
  const [time, setTime] = useState(undefined);
  // time state in ms
  const [timerId, setTimerId] = useState(null);

  // start timer flag
  const [isStarted, setStart] = useState(false);

  // setup settings state
  useEffect(() => {
    const settings = localSetting.get();
    if (isObjEmpty(settings)) {
      // set default settings
      localSetting.set(defaultSettings);
    }
    setSettings(settings);
  }, []);

  return typeof settings !== 'undefined' ? (
    <Wrapper>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home
              settings={settings}
              time={time}
              setTime={setTime}
              timerId={timerId}
              setTimerId={setTimerId}
              isStarted={isStarted}
              setStart={setStart}
            />
          </Route>
          <Route path="/settings">
            {/* TODO: pause timer */}
            <Settings settings={settings} setSettings={setSettings} />
          </Route>
        </Switch>
        <Nav />
      </Router>
    </Wrapper>
  ) : (
    <h1>Wait...</h1>
  );
}
