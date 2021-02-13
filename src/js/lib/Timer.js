export class Timer extends EventTarget {
  constructor() {
    super();
    this.time = undefined;

    // events
    this._complete = new Event('complete');
  }

  set setTime(time) {
    this.time = time;
  }

  stop() {
    clearInterval(this.intervalId);
    delete this.time;
    this.dispatchEvent(this._complete);
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
          self.postMessage({ time: undefined });
        } else {
          console.log(this.time);
          self.postMessage({ time: this.time });
        }
      }, 100);
    }
  }
}
