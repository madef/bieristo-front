class Identifier {
  constructor() {
    this.last = 0;
  }

  flush() {
    this.last = 0;
  }

  get() {
    this.last += 1;
    return this.last;
  }
}
export default new Identifier();
