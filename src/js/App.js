import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

// Fontawesome
import './plugins/fontawesome';

// Routes
import { Home } from './routes/Home';
import { Settings } from './routes/Settings';

// navigation
import { Nav } from './components/Nav';

// Helpers
import { isObjEmpty, localSetting } from './lib/helpers';

// Default settings and strings
import { defaultSettings, notificationText } from './lib/defaults';

// Worker
import timeWorker from './timer.worker';

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
  // start timer flag
  const [isStarted, setStart] = useState(false);
  // timer type
  const [isWorkTimer, setWorkTimer] = useState(true);
  // time worker
  const [worker, setWorker] = useState(undefined);

  // toggles timer on and off
  function toggleTimer() {
    setStart((prevStarted) => !prevStarted);
  }

  // reset timer and set time to next lap
  function nextLap() {
    setStart(false);
    setWorkTimer((prevWorkTimer) => !prevWorkTimer);
  }

  // reset current lap
  function resetLap() {
    setStart(false);
    setTime(isWorkTimer ? settings.workTime : settings.restTime);
  }

  // notify the user that the time is up
  function sendNotification() {
    electron.notificationApi.sendNotification(
      isWorkTimer
        ? notificationText.transitionToRest
        : notificationText.transitionToWork
    );
  }

  function handleMessage(event) {
    switch (event.data.event) {
      case 'time':
        setTime(event.data.time);
        break;
      case 'end':
        nextLap();
        sendNotification();
        break;
    }
  }

  useEffect(() => {
    // Set up webworker
    setWorker(new timeWorker());
  }, []);

  useEffect(() => {
    if (typeof worker === 'undefined') {
      return;
    }
    worker.addEventListener('message', handleMessage);

    return () => {
      worker.postMessage({ type: 'stop' });
      worker.removeEventListener('message', handleMessage);
      setWorker(undefined);
    };
  }, [worker]);

  useEffect(() => {
    if (typeof worker !== 'undefined') {
      if (isStarted) {
        worker.postMessage({ type: 'start', time });
      } else {
        worker.postMessage({ type: 'stop' });
      }
    }
  }, [isStarted]);

  // Setup time
  useEffect(() => {
    // Will be undefined on first render
    if (typeof settings !== 'undefined') {
      // Update time to current setting
      setTime(isWorkTimer ? settings.workTime : settings.restTime);
    }
  }, [isWorkTimer, settings]);

  // Setup settings state
  useEffect(() => {
    const settings = localSetting.get();
    if (isObjEmpty(settings)) {
      // Set default settings
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
            <Settings settings={settings} setSettings={setSettings} />
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
