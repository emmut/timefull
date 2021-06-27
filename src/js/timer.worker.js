import { Timer } from './lib/Timer';
let workerTimer = new Timer();

self.onmessage = (msg) => {
  switch (msg.data.type) {
    case 'start':
      handleStart(msg.data.time);
      break;
    case 'stop':
      handleStop();
      break;
    default:
      self.postMessage({ error: 'Worker error' });
      break;
  }
};

function handleStart(time) {
  workerTimer.setTime = time;
  workerTimer.start();
}

function handleStop() {
  workerTimer.stop();
}
