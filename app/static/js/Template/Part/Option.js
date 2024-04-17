import TemplatePartNodeAbstract from './NodeAbstract';
import TemplatePartRawText from './RawText';

class TemplatePartOption extends TemplatePartNodeAbstract {
  constructor(content, value) {
    super();
    this.node = 'option';

    this.contents = [new TemplatePartRawText(content)];
    this.setAttribute('value', value);
  }
}

export default TemplatePartOption;
