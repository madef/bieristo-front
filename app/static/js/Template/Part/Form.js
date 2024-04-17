import TemplatePartNodeAbstract from './NodeAbstract';
import TemplatePartRawText from './RawText';

class TemplatePartForm extends TemplatePartNodeAbstract {
  constructor(content) {
    super();
    this.node = 'form';
  }

  setAction(callback) {
    this.actions.push({ eventName: 'onsubmit', querySelector: this.getQuerySelector(), callback });

    return this;
  }
}

export default TemplatePartForm;
