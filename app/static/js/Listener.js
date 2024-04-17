class Listener {
  constructor() {
    this.events = [];
  }

  flush() {
    this.events = [];
  }

  add(eventName, querySelector, callback) {
    this.events.push({
      eventName,
      querySelector,
      callback,
    });
  }

  run() {
    for (const i in this.events) {
      const elt = document.querySelector(this.events[i].querySelector);
      if (elt !== null) {
        elt[this.events[i].eventName] = this.events[i].callback;
      }
    }
  }
}
export default new Listener();
