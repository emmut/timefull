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
  display: grid;
  place-items: center;
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
  // time state in ms
  const [time, setTime] = useState(undefined);
  // current interval id
  const [timerId, setTimerId] = useState(null);
  // start timer flag
  const [isStarted, setStart] = useState(false);
  // timer type {work|rest}
  const [isWorkTimer, setWorkTimer] = useState(true);

  function updateTime() {
    setTime((prevTime) => {
      // is timer active?
      if (prevTime - 100 > 0) {
        // subtract time
        return prevTime - 100;
      } else {
        // the end
        setWorkTimer(!isWorkTimer);
        return undefined;
      }
    });
  }

  function turnOffTimer() {
    // clear timer
    clearInterval(timerId);
    // clear timer state
    setTimerId(undefined);
    setStart(false);
  }

  function toggleTimer() {
    setStart(!isStarted);
    if (timerId) {
      turnOffTimer();
      return;
    }
    setTimerId(setInterval(() => updateTime(), 100));
  }

  // reset timer and set time to next lap
  function nextLap() {
    setWorkTimer(!isWorkTimer);
    turnOffTimer();
  }

  // reset current lap
  function resetLap() {
    setTime(isWorkTimer ? settings.workTime : settings.restTime);
  }

  useEffect(() => {
    // the timer has reached the end
    if (typeof time === 'undefined') {
      turnOffTimer();
    }
  }, [time]);

  useEffect(() => {
    // will be undefined on first render
    if (typeof settings === 'undefined') {
      return;
    }
    setTime(isWorkTimer ? settings.workTime : settings.restTime);
  }, [isWorkTimer, settings]);

  // setup settings state
  useEffect(() => {
    const settings = localSetting.get();
    if (isObjEmpty(settings)) {
      // set default settings
      localSetting.set(defaultSettings);
      setSettings(defaultSettings);
    } else {
      setSettings(settings);
    }
  }, []);

  return typeof settings !== 'undefined' ? (
    <Wrapper>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home
              settings={settings}
              time={time}
              isStarted={isStarted}
              toggleTimer={toggleTimer}
              nextLap={nextLap}
              resetLap={resetLap}
              isWorkTimer={isWorkTimer}
            />
          </Route>
          <Route path="/settings">
            <Settings
              settings={settings}
              setSettings={setSettings}
              toggleTimer={toggleTimer}
              timerId={timerId}
            />
          </Route>
        </Switch>
        <Nav />
      </Router>
    </Wrapper>
  ) : (
    <Wrapper>
      <h1>Loading...</h1>
    </Wrapper>
  );
}
