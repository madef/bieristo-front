import TemplatePartNodeAbstract from './NodeAbstract';

class TemplatePartInput extends TemplatePartNodeAbstract {
  constructor() {
    super();
    this.node = 'input';
  }

  setName(name) {
    this.setAttribute('name', name);

    return this;
  }

  setType(type) {
    this.setAttribute('type', type);

    return this;
  }

  setPlaceholder(placeholder) {
    this.setAttribute('placeholder', placeholder);

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

  setRequired() {
    this.setAttribute('required');

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

  setMin(min) {
    this.setAttribute('min', min);

    return this;
  }

  setMax(max) {
    this.setAttribute('max', max);

    return this;
  }

  setStep(step) {
    this.setAttribute('step', step);

    return this;
  }

  setAction(type, callback) {
    this.actions.push({ eventName: type, querySelector: this.getQuerySelector(), callback });

    return this;
  }
}

export default TemplatePartInput;
