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
    case 'reset':
      handleReset(msg.data.time);
      break;
    default:
      // TODO: throw error
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

function handleReset(time) {
  workerTimer.setTime = time;
}
