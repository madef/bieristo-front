import Identifier from '../Identifier';

class TemplateElement {
  constructor() {
    this.contents = [];
  }

  appendChild(templateElement) {
    this.contents.push(templateElement);

    return this;
  }

  getIdentifier() {
    if (typeof this.identifier === 'undefined') {
      this.identifier = Identifier.get();
    }

    return this.identifier;
  }

  setIdentifier(identifier) {
    this.identifier = identifier;

    return this;
  }

  getQuerySelector() {
    return `[data-identifier="${this.getIdentifier()}"]`;
  }

  get() {
    return document.querySelector(this.getQuerySelector());
  }

  render() {
    let html = '';
    for (const i in this.contents) {
      html += this.contents[i].render();
    }

    return html;
  }

  getDom() {
    return new DOMParser().parseFromString(this.render(), 'text/html');
  }

  renderAsDom() {
    return new DOMParser().parseFromString(this.render(), 'text/html').body.firstChild;
  }
}

export default TemplateElement;
