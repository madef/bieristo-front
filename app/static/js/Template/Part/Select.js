import TemplatePartNodeAbstract from './NodeAbstract';

class TemplatePartSelect extends TemplatePartNodeAbstract {
  constructor() {
    super();
    this.node = 'select';
    this.classes = ['form-select'];
  }

  setName(name) {
    this.setAttribute('name', name);

    return this;
  }

  setRequired() {
    this.setAttribute('required');

    return this;
  }

  setDisabled() {
    this.setAttribute('disabled');

    return this;
  }

  setAutofocus() {
    this.setAttribute('autofocus');

    return this;
  }

  setAutocomplete(value) {
    this.setAttribute('autocomplete', value);

    return this;
  }

  setValue(value) {
    this.setAttribute('value', value);

    return this;
  }

  setAriaLabel(ariaLabel) {
    this.setAttribute('aria-label', ariaLabel);

    return this;
  }

  setAction(type, callback) {
    this.actions.push({ eventName: type, querySelector: this.getQuerySelector(), callback });

    return this;
  }
}

export default TemplatePartSelect;
