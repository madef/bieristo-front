import Page from './Page';

class Menu {
  constructor() {
    this.active = true;
  }

  displayMenu() {
    const menu = document.querySelector('[data-identifier="menu"');
    const container = document.querySelector('[data-identifier="main-content"');

    if (this.active) {
      menu.classList.remove('d-none');
      if (Page.isMobile()) {
        container.classList.add('d-none');
      }
    } else {
      menu.classList.add('d-none');
      if (Page.isMobile()) {
        container.classList.remove('d-none');
      }
    }
  }

  toogleOnMobile() {
    if (Page.isMobile()) {
      this.toogle();
    }
  }

  toogle() {
    this.active = !this.active;
    this.displayMenu();
  }

  close() {
    this.active = false;
    this.displayMenu();
  }
}

export default new Menu();
