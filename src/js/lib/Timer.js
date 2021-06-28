export class Timer {
  constructor() {
    this.time = 0;
    this.intervalId = undefined;
  }

  set setTime(time) {
    this.time = time;
  }

  start() {
    if (typeof this.intervalId === 'undefined') {
      this.intervalId = setInterval(() => {
        this.time -= 100;
        if (this.time === 0) {
          this.stop();
          self.postMessage({ event: 'end' });
        } else {
          self.postMessage({ event: 'time', time: this.time });
        }
      }, 100);
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
}
