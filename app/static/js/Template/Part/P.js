import TemplatePartNodeAbstract from './NodeAbstract';
import TemplatePartRawText from './RawText';

class TemplatePartP extends TemplatePartNodeAbstract {
  constructor(content) {
    super();
    this.node = 'p';

    this.contents = [new TemplatePartRawText(content)];
  }
}

export default TemplatePartP;
