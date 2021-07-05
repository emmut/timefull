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
import { defaultSettings } from './lib/defaults';
import microcopy from './lib/microcopy.json';

// Sound
import plong from '../sounds/plong.mp3';
const plongAudio = new Audio(plong);

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
  // Time state in ms
  const [time, setTime] = useState(undefined);
  // Start timer flag
  const [isStarted, setIsStarted] = useState(false);
  // Timer type
  const [isWorkTimer, setWorkTimer] = useState(true);
  // Time worker
  const [worker, setWorker] = useState(undefined);
  // Notification state
  const [showNotification, setShowNotification] = useState(false);
  // Settings
  const [settings, setSettings] = useState(undefined);

  // Toggles timer on and off
  function toggleTimer() {
    setIsStarted((prevStarted) => !prevStarted);
  }

  // reset timer and set time to next lap
  function nextLap() {
    setIsStarted(false);
    setWorkTimer((prevWorkTimer) => !prevWorkTimer);
  }

  // reset current lap
  function resetLap() {
    setIsStarted(false);
    setTime(isWorkTimer ? settings.workTime : settings.restTime);
  }

  function handleMessage(event) {
    switch (event.data.event) {
      case 'time':
        setTime(event.data.time);
        break;
      case 'end':
        {
          nextLap();
          setShowNotification(true);
          const settings = localSetting.get();
          if (settings.inFace) {
            electron.move.top();
          }
          if (settings.alertSound) {
            plongAudio.play();
          }
        }
        break;
    }
  }

  // Set up webworker
  useEffect(() => {
    setWorker(new timeWorker());
  }, []);

  // Set up worker event
  useEffect(() => {
    if (worker instanceof Worker) {
      worker.addEventListener('message', handleMessage);

      // Clean up worker event
      return () => {
        worker.postMessage({ type: 'stop' });
        worker.removeEventListener('message', handleMessage);
        setWorker(undefined);
      };
    }
  }, [worker]);

  // Handle start/stop
  useEffect(() => {
    if (typeof worker !== 'undefined') {
      if (isStarted) {
        setShowNotification(false);
        worker.postMessage({ type: 'start', time });
      } else {
        worker.postMessage({ type: 'stop' });
      }
    }
  }, [isStarted]);

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

  // Setup time setting
  useEffect(() => {
    // Will be undefined on first render
    if (typeof settings !== 'undefined') {
      // Update time to current setting
      setTime(isWorkTimer ? settings.workTime : settings.restTime);
    }
  }, [isWorkTimer, settings]);

  // Handle notifications
  useEffect(() => {
    if (showNotification) {
      electron.notificationApi.sendNotification(
        isWorkTimer ? microcopy.transitionToWork : microcopy.transitionToRest
      );
    }
  }, [isWorkTimer, showNotification]);

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
