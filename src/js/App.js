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
import { defaultSettings, notificationText } from './lib/defaults';

// testing workers
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
  // timer type {work|rest}
  const [isWorkTimer, setWorkTimer] = useState(true);
  // time worker
  const [worker, setWorker] = useState(undefined);

  useEffect(() => {
    // set up webworker
    setWorker(new timeWorker());
    return () => {
      worker.postMessage({ type: 'stop' });
      worker.removeEventListener('message', handleTimeUpdate);
      setWorker(undefined);
    };
  }, []);

  useEffect(() => {
    if (typeof worker !== 'undefined') {
      if (isStarted) {
        worker.postMessage({ type: 'start', time });
        worker.addEventListener('message', handleTimeUpdate);
      } else {
        worker.postMessage({ type: 'stop' });
        worker.removeEventListener('message', handleTimeUpdate);
      }
    }
  }, [isStarted]);

  function handleTimeUpdate(event) {
    setTime(event.data.time);
  }

  // toggles timer on and off
  function toggleTimer() {
    setStart(!isStarted);
  }

  // reset timer and set time to next lap
  function nextLap() {
    setStart(false);
    setWorkTimer(!isWorkTimer);
    worker.postMessage({ type: 'stop' });
  }

  // reset current lap
  function resetLap() {
    setStart(false);
    setTime(isWorkTimer ? settings.workTime : settings.restTime);
    worker.postMessage({ type: 'stop' });
  }

  function sendNotification() {
    // notify the user that the time is up
    electron.notificationApi.sendNotification(
      isWorkTimer
        ? notificationText.transitionToRest
        : notificationText.transitionToWork
    );
  }

  useEffect(() => {
    if (time === 0) {
      nextLap();
      // the timer has reached the end
      sendNotification();
    }
  }, [time]);

  useEffect(() => {
    // will be undefined on first render
    if (typeof settings !== 'undefined') {
      // Update time to current setting
      setTime(isWorkTimer ? settings.workTime : settings.restTime);
    }
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
