import TemplatePartNodeAbstract from './NodeAbstract';
import TemplatePartRawText from './RawText';

class TemplatePartLabel extends TemplatePartNodeAbstract {
  constructor(content) {
    super();
    this.node = 'label';

    if (typeof content == 'string') {
      this.contents = [new TemplatePartRawText(content)];
    }
  }

  setFor(value) {
    this.setAttribute('for', value);

    return this;
  }
}

export default TemplatePartLabel;
