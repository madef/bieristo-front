import TemplatePartNodeAbstract from './NodeAbstract';

class TemplatePartTextarea extends TemplatePartNodeAbstract {
  constructor() {
    super();
    this.node = 'textarea';
  }

  setName(name) {
    this.setAttribute('name', name);

    return this;
  }

  setRequired() {
    this.setAttribute('required');

    return this;
  }

  setAutofocus() {
    this.setAttribute('autofocus');

    return this;
  }
}

export default TemplatePartTextarea;
