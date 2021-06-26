export class Timer extends EventTarget {
  constructor() {
    super();
    this.time = undefined;
    this.intervalId = undefined;

    // events
    this._complete = new Event('complete');
  }

  set setTime(time) {
    this.time = time;
  }

  stop() {
    clearInterval(this.intervalId);
    delete this.intervalId;
  }

  start() {
    if (typeof this.time === 'undefined') {
      //TODO: throw error
      return;
    }
    if (typeof this.intervalId === 'undefined') {
      this.intervalId = setInterval(() => {
        this.time -= 100;
        if (this.time <= 0) {
          this.stop();
          self.postMessage({ time: 0 });
          this.dispatchEvent(this._complete);
        } else {
          self.postMessage({ time: this.time });
        }
      }, 100);
    }
  }
}
