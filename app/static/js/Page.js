class Page {
  constructor() {
    this.breakpoint = 768;
  }

  isMobile() {
    return document.querySelector('body').offsetWidth < this.breakpoint;
  }
}

export default new Page();
