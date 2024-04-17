import TemplatePartNodeAbstract from './NodeAbstract';

class TemplatePartButton extends TemplatePartNodeAbstract {
  constructor(text) {
    super();
    this.node = 'button';
    this.attributes = { type: 'button' };
    this.type = 'primary';
    this.classes = ['btn'];
    this.params = {};
    if (typeof text !== 'undefined') {
      this.text = text;
    }
  }

  addVariation(type) {
    this.classes.push(`btn-${type}`);

    return this;
  }

  setType(type) {
    this.attributes.type = type;

    return this;
  }

  disable() {
    this.setAttribute('disabled');

    return this;
  }

  enable() {
    this.removeAttribute('disabled');

    return this;
  }

  setAction(callback) {
    this.actions.push({ eventName: 'onclick', querySelector: this.getQuerySelector(), callback });

    return this;
  }
}

export default TemplatePartButton;
