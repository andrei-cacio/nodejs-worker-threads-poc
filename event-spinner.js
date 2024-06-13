const immediately =
  typeof setImmediate === 'function'
    ? setImmediate
    : (cb) => cb();

class EventLoopSpinner {
  
  constructor() {
    this.afterLastSpin = Date.now();
    this.thresholdMs = 10
  }

  isStarving() {
    return Date.now() - this.afterLastSpin > this.thresholdMs;
  }

  spin() {
    return new Promise((resolve) =>
      immediately(() => {
        this.afterLastSpin = Date.now();
        resolve();
      }),
    );
  }
}

exports.default = new EventLoopSpinner();
