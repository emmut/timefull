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
  // notification state
  const [notified, setNotified] = useState(undefined);
  // time worker
  const [worker, setWorker] = useState(undefined);

  // set up webworker
  useEffect(() => {
    setWorker(new timeWorker());
    return () => {
      setWorker(undefined);
    };
  }, []);

  useEffect(() => {
    if (typeof worker !== 'undefined') {
      if (isStarted) {
        worker.postMessage({ type: 'start', time });
        worker.addEventListener('message', (event) => setTime(event.data.time));
      } else {
        worker.postMessage({ type: 'stop' });
      }
    }
  }, [isStarted]);

  // toggles timer on and off
  function toggleTimer() {
    setStart(!isStarted);
  }

  // reset timer and set time to next lap
  function nextLap() {
    setNotified(false);
    setWorkTimer(!isWorkTimer);
    worker.postMessage({ type: 'stop' });
  }

  // reset current lap
  function resetLap() {
    setNotified(false);
    setTime(isWorkTimer ? settings.workTime : settings.restTime);
    worker.postMessage({ type: 'reset', time });
  }

  // pauses timer at current time state
  function turnOffTimer() {
    worker.postMessage({ type: 'stop' });
  }

  useEffect(() => {
    // the timer has reached the end
    console.log(time);
    if (time === 0) {
      turnOffTimer();

      electron.notificationApi.sendNotification(
        isWorkTimer
          ? notificationText.transitionToRest
          : notificationText.transitionToWork
      );
    }
  }, [time]);

  useEffect(() => {
    // will be undefined on first render
    if (typeof settings === 'undefined') {
      return;
    }
    // prevents notification on pageload
    if (typeof notified !== 'undefined' && !notified) {
      // notify the user that the time is up
      electron.notificationApi.sendNotification(
        isWorkTimer
          ? notificationText.transitionToRest
          : notificationText.transitionToWork
      );
      setNotified(true);
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
