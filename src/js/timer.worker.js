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
      // TODO: throw error
      break;
  }
};

function handleStart(time) {
  workerTimer.setTime = time;
  console.log(workerTimer);
  workerTimer.start();
}

function handleStop() {
  workerTimer.stop();
  workerTimer.addEventListener('complete', () => console.log('is completed'));
}

function handleReset() {}
