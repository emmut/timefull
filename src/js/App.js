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
import myWorker from './test.worker';

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
  const [notified, setNotified] = useState(undefined);

  const [count, setCount] = useState(0);

  const worker = new myWorker();
  useEffect(() => {
    worker.postMessage(count);
    worker.addEventListener('message', (event) => setCount(event.data));
  }, []);

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

  // pauses timer at current time state
  function turnOffTimer() {
    // clear timer
    clearInterval(timerId);
    // clear timer state
    setTimerId(undefined);
    setStart(false);
  }

  // toggles timer on and off
  function toggleTimer() {
    // make notifiable
    setNotified(false);
    setStart(!isStarted);
    if (timerId) {
      turnOffTimer();
      return;
    }
    setTimerId(setInterval(() => updateTime(), 100));
  }

  // reset timer and set time to next lap
  function nextLap() {
    setNotified(false);
    setWorkTimer(!isWorkTimer);
    turnOffTimer();
  }

  // reset current lap
  function resetLap() {
    setNotified(false);
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
            <Settings
              settings={settings}
              setSettings={setSettings}
              toggleTimer={toggleTimer}
              timerId={timerId}
            />
          </Route>
        </Switch>
        <Nav />
        {count}
      </Router>
    </Wrapper>
  ) : (
    <Wrapper>
      <h1>Loading...</h1>
    </Wrapper>
  );
}
