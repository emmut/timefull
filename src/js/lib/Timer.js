export class Timer {
  constructor() {
    this.time = undefined;
    this.intervalId = undefined;
  }

  set setTime(time) {
    this.time = time;
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }

  start() {
    if (typeof this.time === 'undefined') {
      return;
    }
    if (typeof this.intervalId === 'undefined') {
      this.intervalId = setInterval(() => {
        this.time -= 100;
        if (this.time <= 0) {
          this.stop();
          self.postMessage({ time: 0 });
        } else {
          self.postMessage({ time: this.time });
        }
      }, 100);
    }
  }
}
